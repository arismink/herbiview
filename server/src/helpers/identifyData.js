const identifyData = (data) => {
  return {
    image_url: data.images.url,
    plant_name: data.suggestions[0].plant_name,
    common_names: data.suggestions[0].plant_details.common_names,
    info_url: data.suggestions[0].plant_details.url,
    description: data.suggestions[0].plant_details.wiki_description.value,
    sci_name: data.suggestions[0].plant_details.scientific_name,
    probability: data.suggestions[0].probability,
    similar_images: [data.suggestions[0].similar_images[0].url, data.suggestions[0].similar_images[1].url],
  }
}
module.exports = identifyData;