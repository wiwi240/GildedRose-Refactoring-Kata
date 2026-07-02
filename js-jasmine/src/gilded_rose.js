class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  static AGED_BRIE = "Aged Brie";
  static BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
  static SULFURAS = "Sulfuras, Hand of Ragnaros";
  static CONJURED_PREFIX = "Conjured";

  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      if (this.isSulfuras(item)) {
        return;
      }

      this.updateItemQuality(item);
      item.sellIn -= 1;
    });

    return this.items;
  }

  updateItemQuality(item) {
    if (this.isAgedBrie(item)) {
      this.increaseQuality(item, item.sellIn <= 0 ? 2 : 1);
      return;
    }

    if (this.isBackstagePass(item)) {
      this.updateBackstagePassQuality(item);
      return;
    }

    this.decreaseQuality(item, this.qualityLossRate(item));
  }

  updateBackstagePassQuality(item) {
    if (item.sellIn <= 0) {
      item.quality = 0;
      return;
    }

    if (item.sellIn <= 5) {
      this.increaseQuality(item, 3);
      return;
    }

    if (item.sellIn <= 10) {
      this.increaseQuality(item, 2);
      return;
    }

    this.increaseQuality(item, 1);
  }

  qualityLossRate(item) {
    const baseRate = this.isConjured(item) ? 2 : 1;
    return item.sellIn <= 0 ? baseRate * 2 : baseRate;
  }

  increaseQuality(item, amount) {
    item.quality = Math.min(50, item.quality + amount);
  }

  decreaseQuality(item, amount) {
    item.quality = Math.max(0, item.quality - amount);
  }

  isAgedBrie(item) {
    return item.name === Shop.AGED_BRIE;
  }

  isBackstagePass(item) {
    return item.name === Shop.BACKSTAGE_PASSES;
  }

  isSulfuras(item) {
    return item.name === Shop.SULFURAS;
  }

  isConjured(item) {
    return item.name.startsWith(Shop.CONJURED_PREFIX);
  }
}

module.exports = {
  Item,
  Shop,
};
