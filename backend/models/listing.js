const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    plantName : String,
    image : String,
    commonName: String,
      habitat: String,
       medicinalUses: String,
          cultivation: String,
          content : String,
          price : Number,
          type : String,
           scientificName : String,
  origin: String,
  plantType: String,
  appearance: String,
  propagationMethods: String,
  commonPestsAndDiseases: String,
  PlantUses: String,
  Precautions: String,
  EcologicalImportance: String,
  SeasonalCalendar: String,
  GrowthStatics: String,
  ScientificResearch: String,
  SoilPHPreference: String,
  WateringNeeds: String,
  RepottingInformation: String,
  read : String,
  iframe : String,
})

const Listing = mongoose.model("Listing",Schema)


module.exports = Listing;