<template>
  <main-reading :temperature="latestReading[0].temperature" :humidity="latestReading[0].humidity"
   :LTemp ="minReadings.temperature" :LHum = "minReadings.humidity"
   :MTemp = "maxReadings.temperature" :MHum = "maxReadings.humidity"></main-reading>

  <h3 class="prevReadingsHeader">⌚Poprzednie odczyty</h3>
  <div class="fivePrevReadings">
    <previous-reading v-for=" reading in readings" :key="reading.id" :temperature="reading.temperature"
      :registrationTime="reading.registrationTime.substring(11, 16)" :humidity="reading.humidity"
      :dayAndMonth = "reading.registrationTime.substring(5,10)">
    </previous-reading>
  </div>

  <h3 class="prevReadingsHeader">⌚Odczyty z przedziału czasu</h3>
  <div class="datetimePickers">
    <input type="datetime-local" id="dateFrom" @change="setTimeFrom">
    <input type="datetime-local" id="dateTo" @change="setTimeTo">
  </div>

  <h3 class="prevReadingsHeader">{{ invalidOrder }}</h3>
  <div class="prevReadings">
    <previous-reading v-for=" reading in readingsTimespan" :key="reading.id" :temperature="reading.temperature"
      :registrationTime="reading.registrationTime.substring(11, 16)" :humidity="reading.humidity"
      :dayAndMonth = "reading.registrationTime.substring(5,10)">
    </previous-reading>
  </div>

  <button id="refreshButton" class="actionButton" v-on:click="getReadings">↻</button>

</template>


<script>
export default {
  data() {
    return {
      readings: [],
      latestReading: "",
      maxReadings: [],
      minReadings: [],
      readingsTimespan: [],
      timeFrom: "",
      timeTo: "",
      invalidOrder: ""
    }
  },
  methods: {
    async getReadings() {
      try {
        //TODO run simultaneously in parallel
        const response1 = await fetch("https://localhost:7170/api/sensor/fiveLatestReadings");
        const data1 = await response1.json();

        const response2 = await fetch("https://localhost:7170/api/sensor/latestReading");
        const data2 = await response2.json();

        const response3 = await fetch("https://localhost:7170/api/sensor/maxReadings");
        const data3 = await response3.json();

        const response4 = await fetch("https://localhost:7170/api/sensor/minReadings");
        const data4 = await response4.json();

        this.readings = data1;
        this.latestReading = data2;
        this.maxReadings = data3;
        this.minReadings = data4;
        
      } catch (error) { console.log(error) }
    },

    setTimeFrom(event) {
      this.timeFrom = event.target.value;
      console.log(this.timeFrom);
    },

    setTimeTo(event) {
      this.timeTo = event.target.value;
      console.log(this.timeto);

      if (this.timeFrom <= this.timeTo) {
        this.getReadingsInTimeSpan();
        this.invalidOrder = "Uzyskane dane"
      }
      else
        this.invalidOrder = "Data 1 nie może być po dacie 2";
    },

    async getReadingsInTimeSpan() {
      const response = await fetch(`https://localhost:7170/api/sensor/readingsInTimeSpan?from=${this.timeFrom}&to=${this.timeTo}`);
      const data = await response.json();
      this.readingsTimespan = data;

      console.log(data);
    }
  },

  created() {
    this.getReadings();
  }

}
</script>

<style>
html {
  background-color: rgb(2, 20, 32);
  font-family: 'Roboto', sans-serif;
  color: white;
  overflow: scroll;
}

header h1 {
  color: white;
  text-align: center;
  font-size: 200%;
}

.fivePrevReadings {
  display: flex;
  width: 80%;
  margin: auto;
  justify-content: center;
}

.prevReadings{
  display: flex;
  width: 80%;
  margin: auto;
  justify-content: first baseline;
  overflow: scroll;
}

.prevReadingsHeader {
  padding: 1%;
  font-size: 110%;
  font-weight: lighter;
  letter-spacing: 0.05em;
  text-align: center;
}

.datetimePickers {
  text-align: center;
  /* flex: 1; */
  margin: auto;
  width: 100%;
}

input[type="datetime-local"] {
  background-color: brown;
  color: white;
  border-radius: 15px;
  background-color: rgb(3, 25, 40);
  outline: none;
  border: none;
  font-weight: bolder;
  font-family: 'Roboto', sans-serif;
  padding: 5px;
  width: 40%;
}

#refreshButton {
  background-color: rgb(201, 111, 201);
  width: 85%;
  text-align: center;
  justify-content: center;
  color: white;
  border-radius: 15px;
  border: none;
  display: flex;
  margin: auto;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  /* left: 42.5%; */
  bottom: 10px;
  /* transform: translate(-50%, -50%); */
  font-size: larger;
  opacity: 0.95;
  margin-top: 40px;
}

#refreshButton:hover {
  transition: opacity 0.5s;
  opacity: 1;
}

#dateFrom {
  margin-right: 5%;
}

::-webkit-calendar-picker-indicator {
  background-color: white;
  border-radius: 5px;

}
</style>