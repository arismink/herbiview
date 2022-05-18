const suggestions = (suggestions) => {
  return suggestions.map((el, index) => {
    return index = {key: index, plant_name: el.plant_name, probability: Number((el.probability * 100).toFixed())}
  });
}

const identifyData = (data) => {
  return {
    image_url: data.images[0].url,
    plant_name: data.suggestions[0].plant_name,
    common_names: data.suggestions[0].plant_details.common_names,
    info_url: data.suggestions[0].plant_details.url,
    description: data.suggestions[0].plant_details.wiki_description.value,
    sci_name: data.suggestions[0].plant_details.scientific_name,
    suggestions: suggestions(data.suggestions),
    similar_images: [data.suggestions[0].similar_images[0].url, data.suggestions[0].similar_images[1].url],
  }
}
module.exports = identifyData;