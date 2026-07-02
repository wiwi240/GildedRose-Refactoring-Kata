const { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", () => {
  const updateOnce = (...items) => new Shop(items).updateQuality();

  it("keeps a full mixed inventory consistent over two days", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const shop = new Shop(items);
    shop.updateQuality();
    shop.updateQuality();

    expect(items.map(({ name, sellIn, quality }) => ({ name, sellIn, quality }))).toEqual([
      { name: "+5 Dexterity Vest", sellIn: 8, quality: 18 },
      { name: "Aged Brie", sellIn: 0, quality: 2 },
      { name: "Elixir of the Mongoose", sellIn: 3, quality: 5 },
      { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
      { name: "Sulfuras, Hand of Ragnaros", sellIn: -1, quality: 80 },
      { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 13, quality: 22 },
      { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 8, quality: 50 },
      { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 3, quality: 45 },
      { name: "Conjured Mana Cake", sellIn: 1, quality: 2 },
    ]);
  });

  it("decreases normal item quality by 1 before the sell date", () => {
    const items = updateOnce(new Item("+5 Dexterity Vest", 10, 20));
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(19);
  });

  it("decreases normal item quality by 2 after the sell date", () => {
    const items = updateOnce(new Item("Elixir of the Mongoose", 0, 10));
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(8);
  });

  it("never lets quality go below 0", () => {
    const items = updateOnce(
      new Item("+5 Dexterity Vest", 5, 0),
      new Item("Conjured Mana Cake", 0, 3),
    );

    expect(items[0].quality).toBe(0);
    expect(items[1].quality).toBe(0);
  });

  it("increases aged brie quality by 1 before the sell date", () => {
    const items = updateOnce(new Item("Aged Brie", 2, 0));
    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(1);
  });

  it("increases aged brie quality by 2 after the sell date", () => {
    const items = updateOnce(new Item("Aged Brie", 0, 10));
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(12);
  });

  it("never lets quality go above 50", () => {
    const items = updateOnce(
      new Item("Aged Brie", 5, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    );

    expect(items[0].quality).toBe(50);
    expect(items[1].quality).toBe(50);
  });

  it("does not change sulfuras quality or sellIn", () => {
    const items = updateOnce(
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    );

    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(80);
    expect(items[1].sellIn).toBe(-1);
    expect(items[1].quality).toBe(80);
  });

  it("increases backstage pass quality by 2 when there are 10 days or less", () => {
    const items = updateOnce(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20));
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(22);
  });

  it("increases backstage pass quality by 3 when there are 5 days or less", () => {
    const items = updateOnce(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20));
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(23);
  });

  it("drops backstage pass quality to 0 after the concert", () => {
    const items = updateOnce(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20));
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  it("decreases conjured item quality twice as fast before the sell date", () => {
    const items = updateOnce(new Item("Conjured Dark Blade", 3, 6));
    expect(items[0].sellIn).toBe(2);
    expect(items[0].quality).toBe(4);
  });

  it("decreases conjured item quality four times as fast after the sell date", () => {
    const items = updateOnce(new Item("Conjured Magic Stick", 0, 10));
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(6);
  });
});
