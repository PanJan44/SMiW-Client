<template>
    <div class="prevReading">
        <h3 class="cal">🗓{{dayAndMonth }}</h3>
        <h3>⌚{{ registrationTime }}</h3>
        <h3>🌡{{ temperature }}°C</h3>
        <h3>💧{{ humidity }}%</h3>
    </div>
</template>

<script>
export default {
    props: {
        temperature: {
            type: Number
        },
        registrationTime: {
            type: String
        },
        humidity: {
            type: Number
        },
        dayAndMonth:
        {
            type: String
        }
    }
}
</script>

<style>
.prevReading {
    text-align: center;
    margin: auto;
    flex: 1;
    background-color: rgb(3, 25, 40);
    /* border: .7em rgb(3, 25, 40) solid; */
    border-radius: 15px;
    margin-right: 2%;
    overflow: hidden;
    white-space: nowrap;
    flex-shrink: 0;
    flex-basis: 20%;
}

.cal
{
    font-size: 0.8rem;
    font-weight: lighter;
}

.prevReading h3 {
    /* padding: 0; */
    /* margin: 5%; */
    font-size: 0.8rem;
}
</style>