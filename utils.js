function updateBrieQuality(item) {
  item.sellIn--;
  item.quality++;
  if (item.sellIn < 0) item.quality++;
  if (item.quality > 50) item.quality = 50;
}

function updateConcertQuality(item) {
  item.sellIn--;
  item.quality++;
  if (item.sellIn < 11) {
    item.quality++;
  }
  if (item.sellIn < 6) {
    item.quality++;
  }
  if (item.quality > 50) item.quality = 50;
  if (item.sellIn < 0) item.quality = 0;
}

function updateNormalQuality(item) {
  item.sellIn--;
  item.quality--;
  if (item.sellIn < 0) item.quality--;
  if (item.quality < 0) item.quality = 0;
}

function updateConjuredQuality(item) {
  item.sellIn--;
  item.quality -= 2;
  if (item.sellIn < 0) item.quality -= 2;
  if (item.quality < 0) item.quality = 0;
}

function sulfuras(item) {
  return item;
}

module.exports = {
  updateBrieQuality,
  updateConcertQuality,
  updateNormalQuality,
  updateConjuredQuality,
  sulfuras,
};
