const healthData = (data) => {
  return {
    healthy: data.health_assessment.is_healthy,
    healthy_probability: Number((data.health_assessment.is_healthy_probability * 100).toFixed()),
    disease_name: data.health_assessment.diseases[0].name,
    disease_probability: Number((data.health_assessment.diseases[0].probability * 100).toFixed()),
    disease_info_url: data.health_assessment.diseases[0].disease_details.url,
    disease_prevention: data.health_assessment.diseases[0].disease_details.treatment.prevention,
    disease_description: data.health_assessment.diseases[0].disease_details.description
  }
}

module.exports = healthData;