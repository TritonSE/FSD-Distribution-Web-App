const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const PendingUserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

PendingUserSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = bcrypt.hashSync(user.password, 10);
  }
  return next();
});

UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const TableContentSchema = new Schema({
  agencyNumber: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  staff: {
    type: String,
    required: true,
  },
  /* Compliance section */
  dateOfInitialPartnership: {
    type: String,
    required: true,
  },
  /* Capacity Section */
  // Storage Type
  standAloneFreezer: {
    type: Number,
  },
  freezerFridge: {
    type: Number,
  },
  chestFreezer: {
    type: Number,
  },
  singleDoorFreezer: {
    type: Number,
  },
  freezerFridgeCombo: {
    type: Number,
  },
  walkInFreezer: {
    type: Number,
  },
  doubleDoorFridge: {
    type: Number,
  },
  sideBySideFridge: {
    type: Number,
  },
  singleDoorFridge: {
    type: Number,
  },
  walkInFridge: {
    type: Number,
  },
  dryStorageClimateControl: {
    type: Number,
  },
  dryStorageNonClimateControl: {
    type: Number,
  },
  // Transportation Type
  pickUpTruck: {
    type: Number,
  },
  van: {
    type: Number,
  },
  car: {
    type: Number,
  },
});

const ContactSchema = new Schema({
  contact: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const DaySelectionsSchema = new Schema({
  monday: {
    type: Boolean,
    required: true,
  },
  tuesday: {
    type: Boolean,
    required: true,
  },
  wednesday: {
    type: Boolean,
    required: true,
  },
  thursday: {
    type: Boolean,
    required: true,
  },
  friday: {
    type: Boolean,
    required: true,
  },
  saturday: {
    type: Boolean,
    required: true,
  },
  sunday: {
    type: Boolean,
    required: true,
  },
});

const DayValuesSchema = new Schema({
  monday: {
    type: String,
  },
  tuesday: {
    type: String,
  },
  wednesday: {
    type: String,
  },
  thursday: {
    type: String,
  },
  friday: {
    type: String,
  },
  saturday: {
    type: String,
  },
  sunday: {
    type: String,
  },
});

const TaskSchema = new Schema({
  agencyID: {
    type: mongoose.ObjectId,
    ref: "Agency",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  dateCompleted: {
    type: Date,
    expires: 2592000,
  },
});

const AgencySchema = new Schema({
  /**
   * Accessing the TableContentSchema
   *
   * Ex. tableContent.name
   */
  tableContent: {
    type: TableContentSchema,
    required: true,
  },
  mainSiteAddress: {
    type: String,
    required: true,
  },
  sanDiegoDistrict: {
    type: String,
    required: true,
  },
  countyDistrict: {
    type: String,
    required: true,
  },
  stateAssemblyDistrict: {
    type: String,
    required: true,
  },
  stateSenateDistrict: {
    type: String,
    required: true,
  },
  federalCongressionalDistrict: {
    type: String,
    required: true,
  },
  additionalAddresses: {
    type: [String],
  },
  billingAddress: {
    type: String,
    required: true,
  },
  billingZipcode: {
    type: String,
    required: true,
  },

  /* Contacts Section */
  contacts: {
    type: [ContactSchema],
    required: true,
  },

  /* Compliance Section */
  scheduledNextVisit: {
    type: String,
    required: true,
  },
  dateOfMostRecentAgreement: {
    type: String,
    required: true,
  },
  fileAudit: {
    type: String,
  },
  monitored: {
    type: String,
    required: true,
  },
  foodSafetyCertification: {
    type: String,
    required: true,
  },

  /* Distribution Section */
  // Which days of the week have an event
  distributionDays: {
    type: DaySelectionsSchema,
    required: true,
  },
  // Start time for the event on each day of the week
  distributionStartTimes: {
    type: DayValuesSchema,
    required: true,
  },
  // Start of excluded event patterns for each day of the week
  distributionExcludedTimes: {
    type: DayValuesSchema,
  },
  // Beginning of the pattern
  distributionStartDate: {
    type: String,
    required: true,
  },
  // How many weeks per pattern
  distributionFrequency: {
    type: Number,
    required: true,
  },
  // Extra dates outside pattern
  userSelectedDates: {
    type: [String],
  },
  // Dates in pattern that should be excluded
  userExcludedDDates: {
    type: [String],
  },

  // Dates in pattern that should be excluded
  userExcludedRDates: {
    type: [String],
  },
  // Checkboxes for Distribution Section
  pantry: {
    type: Boolean,
  },
  mealProgram: {
    type: Boolean,
  },
  homeboundDeliveryPartner: {
    type: Boolean,
  },
  largeScaleDistributionSite: {
    type: Boolean,
  },
  residentialFacility: {
    type: Boolean,
  },

  /* Retail Rescue Section */
  retailRescueDays: {
    type: DaySelectionsSchema,
    required: true,
  },
  retailRescueStartTimes: {
    type: DayValuesSchema,
    required: true,
  },
  retailRescueExcludedTimes: {
    type: DayValuesSchema,
  },
  retailRescueLocations: {
    type: DayValuesSchema,
    required: true,
  },

  /* Demographics Section */
  youth: {
    type: Boolean,
  },
  senior: {
    type: Boolean,
  },
  homeless: {
    type: Boolean,
  },
  veteran: {
    type: Boolean,
  },
  healthcare: {
    type: Boolean,
  },
  college: {
    type: Boolean,
  },
  disabilitySpecific: {
    type: Boolean,
  },
  residential: {
    type: Boolean,
  },
  immigrant: {
    type: Boolean,
  },
});

const NotesSchema = new Schema({
  _id: {
    type: String,
  },
  /* Notes text */
  message: {
    type: String,
  },
  /* Identify events part of the same recurrence */
  recurringID: {
    type: String,
  },
  timeFromEpoch: {
    type: Number,
  },
  agencyID: {
    type: String,
  },
});

const Agency = mongoose.model("Agency", AgencySchema);
const Task = mongoose.model("Task", TaskSchema);
const User = mongoose.model("User", UserSchema);
const PendingUser = mongoose.model("PendingUser", PendingUserSchema);
const Notes = mongoose.model("Notes", NotesSchema);

module.exports = { Agency, Task, User, PendingUser, Notes };
