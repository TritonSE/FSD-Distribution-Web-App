const distributionAgency1 = {
  events: [
    {
      "title": "Agency With Timezone Offsets",
      "agencyID": undefined,
      "distribution": "D",
      "rrule": {
        "freq": "weekly",
        "interval": 1,
        "byweekday": "mo",
        "wkst": "mo",
        "dtstart": "2021-05-01T09:00-07:00"
      },
      "recurringID": "undefined2021-05-01T09:00-07:00moD",
      "retailrescue": "",
      "duration": "02:00",
      "color": "hsl(0, 50%, 70%)",
      "exdate": [
        "2021-05-31"
      ],
      "exrule": {
        "byweekday": "mo",
        "dtstart": "",
        "freq": "weekly",
        "interval": 1,
        "wkst": "mo",
      },
    },
    {
      "title": "Agency With Timezone Offsets",
      "agencyID": undefined,
      "distribution": "D",
      "recurringID": "",
      "retailrescue": "",
      "start": "2021-05-13T17:00-07:00",
      "end": "2021-05-13T17:00-07:00",
      "duration": "02:00",
      "color": "hsl(0, 50%, 70%)"
    }
  ],
  title: [
    {
      "name": "Agency With Timezone Offsets",
      "color": "hsl(0, 50%, 70%)"
    },
    {
      "color": "hsl(0, 75%, 75%)",
      "name": "Agency With Timezone Offsets",
    },
  ]
};
const distributionAgency2 = {
  events: [
    {
      "title": "Agency B",
      "agencyID": undefined,
      "distribution": "D",
      "rrule": {
        "freq": "weekly",
        "interval": 1,
        "byweekday": "we",
        "wkst": "we",
        "dtstart": "2021-05-01T09:00-07:00"
      },
      "duration": "02:00",
      "color": "hsl(180, 50%, 70%)",
      "exdate": [],
      "exrule": {
        "byweekday": "we",
        "dtstart": "",
        "freq": "weekly",
        "interval": 1,
        "wkst": "we",
      },
      "recurringID": "undefined2021-05-01T09:00-07:00weD",
      "retailrescue": ""
    }
  ],
  title: [
    {
      "name": "Agency B",
      "color": "hsl(180, 50%, 70%)"
    },
    {
      "color": "hsl(180, 75%, 75%)",
      "name": "Agency B",
    }
  ]
};

const rescueAgency1 = {
  events: [
    {
      "title": "Agency With Timezone Offsets",
      "agencyID": undefined,
      "distribution": "",
      "rrule": {
        "freq": "weekly",
        "interval": 1,
        "byweekday": "mo",
        "wkst": "mo",
        "dtstart": "2021-05-01T00:00-07:00"
      },
      "duration": "01:00",
      "backgroundColor": "#FFFFFF",
      "color": "hsl(0, 50%, 70%)",
      "exdate":  [
        "2021-05-31",
      ],
      "exrule": {
        "byweekday": "mo",
        "dtstart": "",
        "freq": "weekly",
        "interval": 1,
        "wkst": "mo",
      },
      "recurringID": "undefined2021-05-01T00:00-07:00moR",
      "retailrescue": "R",
    }
  ],
  title: [
    {
      "color": "hsl(0, 50%, 50%)",
      "name": "Agency With Timezone Offsets",
    },
    {
      "name": "Agency With Timezone Offsets",
      "color": "hsl(0, 50%, 70%)"
    }
  ]
};

const rescueAgency2 = {
  events: [
    {
      "title": "Agency B",
      "agencyID": undefined,
      "distribution": "",
      "exdate": [],
      "exrule": {
        "byweekday": "we",
        "dtstart": "",
        "freq": "weekly",
        "interval": 1,
        "wkst": "we",
      },
      "rrule": {
        "freq": "weekly",
        "interval": 1,
        "byweekday": "we",
        "wkst": "we",
        "dtstart": "2021-05-01T00:00-07:00"
      },
      "recurringID": "undefined2021-05-01T00:00-07:00weR",
      "retailrescue": "R",
      "duration": "01:00",
      "backgroundColor": "#FFFFFF",
      "color": "hsl(180, 50%, 70%)"
    }
  ],
  title: [
    {
      "color": "hsl(180, 75%, 75%)",
      "name": "Agency B",
    },
    {
      "name": "Agency B",
      "color": "hsl(180, 50%, 50%)"
    }
  ]
};

export  { distributionAgency1, distributionAgency2, rescueAgency1, rescueAgency2 };