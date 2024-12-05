const baseUrl = 'https://dog.ceo/api/breeds';
const baseUrl2 = 'https://dog.ceo/api/breed';

const randomImg = document.querySelector('#random');
const rightSect = document.querySelector('.right-section');
const explore = document.querySelector('#explore');
const select = document.querySelector('#breeds');
const displayDogs = document.querySelector('.dogs-display');

function init() {
	fetchRandomDog();
	allDogBreeds();
}

function fetchRandomDog() {
	fetch(`${baseUrl}/image/random`)
		.then((res) => res.json())
		.then((data) => {
			rightSect.innerHTML = `<img
						src=${data.message}
						alt="doggo"
						id="random"
					/>`;
		});
}

explore.addEventListener('click', fetchRandomDog);

function allDogBreeds() {
	fetch(`${baseUrl}/list/all`)
		.then((res) => res.json())
		.then((data) => {
			const breeds = Object.keys(data.message);

			breeds.map((breed) => {
				const option = document.createElement('option');
				option.textContent = breed;
				option.value = breed;

				select.appendChild(option);

				if (select.selectedOptions[0].value) {
					fetchDogBreed(select.selectedOptions[0].value);
				}
			});
		});

	select.addEventListener('change', (e) => {
		const selectedValue = e.target.value;

		fetchDogBreed(selectedValue);
	});
}

function fetchDogBreed(breed) {
	fetch(`${baseUrl2}/${breed}/images`)
		.then((res) => res.json())
		.then((data) => {
			const images = data.message.slice(0, 8);
			displayDogs.innerHTML = '';
			images.map((image) => {
				const dog = document.createElement('div');
				dog.className = 'dog-card';

				const img = document.createElement('img');
				img.src = image;

				dog.appendChild(img);

				displayDogs.appendChild(dog);
			});
		});
}

init();
