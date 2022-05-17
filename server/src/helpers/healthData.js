const healthData = (data) => {
  return {
    healthy: data.health_assessment.is_healthy,
    healthy_probability: data.health_assessment.is_healthy_probability,
    disease_name: data.health_assessment.diseases[0].name,
    disease_probability: data.health_assessment.diseases[0].probability,
    disease_info_url: data.health_assessment.diseases[0].disease_details.url,
    disease_prevention: data.health_assessment.diseases[0].disease_details.treatment.prevention,
    disease_description: data.health_assessment.diseases[0].disease_details.description
  }
}

module.exports = healthData;