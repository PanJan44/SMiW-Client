<template>
    <div class="mainReading">
        <div class="reading">
            <h1 class="mainValue">{{ temperature }}°C</h1>
            <h3>L: {{ LTemp }}°C M: {{ MTemp }}°C</h3>
        </div>
        <div class="reading">
           <h1 class="mainValue">{{ humidity }}%RH</h1>
            <h3>L: {{LHum}}% M: {{MHum}}%</h3>
        </div>
    </div>

</template>

<script>

export default {
    props: {
        temperature: {
            type: Number
        },
        humidity: {
            type: Number
        },
        LTemp: {
            type: Number
        },
        MTemp: {
            type: Number
        },
        LHum: {
            type: Number
        },
         MHum: {
            type: Number
        },
    }
}
</script>

<style>
.mainReading {
    font-size: 80%;
    color: white;
    background-color: rgb(201, 111, 201);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75%;
    margin: auto;
    border-radius: 15px;
    padding-left: 25px;
    padding-right: 25px;
}

.reading {
    text-align: center;
    /* padding: 20px; */
    flex: 1;
}

.reading h1 {
    font-weight: bold;

}

.reading h3 {
    font-weight: lighter;
}
</style>