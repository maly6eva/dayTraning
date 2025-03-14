"use strict";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");


console.log((Date.now() + '').slice(-10))
class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);
    constructor(coords, distance, duration) {
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }
}

class Running extends Workout {
    constructor(coords, distance, duration,cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace()
    }
    calcPace() {
        this.pace = this.duration / this.distance
        return this.pace;
    }
}

class Cycling extends Workout {
    constructor(coords, distance, duration, elevation) {
        super(coords, distance, duration)
        this.elevation = elevation;
        this.calcSpeed()
    }
    calcSpeed(){
        this.speed = this.distance / (this.duration / 60)
        return this.speed
    }
}

const run = new Running([-4, -35], 6, 34, 467)
const run2 = new Cycling([-5, -65], 3, 64, 587)
console.log(run)
console.log(run2)

let map;
let mapEvent;
if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const {latitude} = position.coords;
            const {longitude} = position.coords;
            const coords = [latitude, longitude];
            map = L.map('map').setView(coords, 10);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            map.on(
                'click',
                function (mapE) {
                    mapEvent = mapE
                    form.classList.remove('hidden')
                    inputDistance.focus()
                },
                function () {
                    alert('Вы не предоставили доступ к своей локации')
                }
            )
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                inputDistance.value =
                    inputDuration.value =
                        inputCadence.value =
                            inputElevation.value = ''


                console.log(mapEvent)
                const {lat, lng} = mapEvent.latlng;
                L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup(
                        L.popup({
                            maxWidth: 250,
                            minWidth: 100,
                            autoClose: false,
                            closeOnClick: false,
                            className: 'mark-popup'
                        })
                    )
                    .setPopupContent('Тренировка')
                    .openPopup();
            })
        })

inputType.addEventListener('change', function () {
    inputCadence.closest('.form__row').classList.toggle
    ('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle
    ('form__row--hidden')
})

