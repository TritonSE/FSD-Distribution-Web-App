const distributionAgency1 = {
  events: [
    {
      "title": "Agency With Timezone Offsets",
      "rrule": {
        "freq": "weekly",
        "interval": 1,
        "byweekday": "mo",
        "wkst": "mo",
        "dtstart": "2021-05-01T09:00-07:00"
      },
      "duration": "02:00",
      "color": "hsl(0, 50%, 50%)",
      "exdate": [
        "2021-05-31"
      ]
    },
    {
      "title": "Agency With Timezone Offsets",
      "start": "2021-05-13T17:00-07:00",
      "end": "2021-05-13T17:00-07:00",
      "duration": "02:00",
      "color": "hsl(0, 50%, 50%)"
    }
  ],
  title: {
    "name": "Agency With Timezone Offsets",
    "color": "hsl(0, 50%, 50%)"
  }
};
const distributionAgency2 = {
  events: [
    {
      "title": "Agency B",
      "rrule": {
        "freq": "weekly",
        "interval": 1,
        "byweekday": "we",
        "wkst": "we",
        "dtstart": "2021-05-01T09:00-07:00"
      },
      "duration": "02:00",
      "color": "hsl(180, 50%, 50%)",
      "exdate": []
    }
  ],
  title: {
    "name": "Agency B",
    "color": "hsl(180, 50%, 50%)"
  }
};

const rescueAgency1 = {
  events: [
    {
      "title": "Agency With Timezone Offsets",
      "rrule": {
        "freq": "weekly",
        "interval": 1,
        "byweekday": "mo",
        "wkst": "mo",
        "dtstart": "2021-05-01T00:00-07:00"
      },
      "duration": "01:00",
      "backgroundColor": "#FFFFFF",
      "color": "hsl(0, 50%, 50%)"
    }
  ],
  title: {
    "name": "Agency With Timezone Offsets",
    "color": "hsl(0, 50%, 50%)"
  }
};

const rescueAgency2 = {
  events: [
    {
      "title": "Agency B",
      "rrule": {
        "freq": "weekly",
        "interval": 1,
        "byweekday": "we",
        "wkst": "we",
        "dtstart": "2021-05-01T00:00-07:00"
      },
      "duration": "01:00",
      "backgroundColor": "#FFFFFF",
      "color": "hsl(180, 50%, 50%)"
    }
  ],
  title: {
    "name": "Agency B",
    "color": "hsl(180, 50%, 50%)"
  }
};

export  { distributionAgency1, distributionAgency2, rescueAgency1, rescueAgency2 };