//stores the URL link of the images
const images = [
    'https://pngimg.com/uploads/blackberry/blackberry_PNG20.png',
    'https://img.freepik.com/free-photo/fresh-kiwi-fruit-isolated_144627-30034.jpg?w=2000',
    'https://assets.shop.loblaws.ca/products/20168395001/b1/en/angle/20168395001_angle_a01_@2.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/800px-Orange-Fruit-Pieces.jpg?20141112073556',
    'https://aldprdproductimages.azureedge.net/media/resized/$Aldi_IE/707988_8ec7fbcbf60d4427a43a05f642afa9e4_L.jpg',
    'https://portaldoorganico.com.br/wp-content/uploads/2021/04/morango.jpg',
    'https://static.libertyprim.com/files/familles/poire-large.jpg?1569271830',
    'https://pngfile.net/public/uploads/preview/watermelon-fruit-png-free-download-31566853958ol4tpyumd4.png',
    'https://static.libertyprim.com/files/familles/pomme-large.jpg?1569271834',
    'https://i0.wp.com/agroarcade.com/wp-content/uploads/2021/02/apple_bananna.png?resize=300%2C300&ssl=1',
    'https://static.libertyprim.com/files/familles/fruit_de_la_passion-large.jpg?1569271767',
    'https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_960,f_auto/DCTM_Penguin_UK_DK_AL226924_ohrtyp.jpg'
];

//stores the answers for each link(image) that correspond
const rightAnswers = {
    'https://pngimg.com/uploads/blackberry/blackberry_PNG20.png': 'blackberry',
    'https://img.freepik.com/free-photo/fresh-kiwi-fruit-isolated_144627-30034.jpg?w=2000': 'kiwi',
    'https://assets.shop.loblaws.ca/products/20168395001/b1/en/angle/20168395001_angle_a01_@2.png': 'dragon',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/800px-Orange-Fruit-Pieces.jpg?20141112073556': 'orange',
    'https://aldprdproductimages.azureedge.net/media/resized/$Aldi_IE/707988_8ec7fbcbf60d4427a43a05f642afa9e4_L.jpg': 'lime',
    'https://portaldoorganico.com.br/wp-content/uploads/2021/04/morango.jpg': 'strawberry',
    'https://static.libertyprim.com/files/familles/poire-large.jpg?1569271830': 'pear',
    'https://pngfile.net/public/uploads/preview/watermelon-fruit-png-free-download-31566853958ol4tpyumd4.png': 'watermelon',
    'https://static.libertyprim.com/files/familles/pomme-large.jpg?1569271834': 'apple',
    'https://i0.wp.com/agroarcade.com/wp-content/uploads/2021/02/apple_bananna.png?resize=300%2C300&ssl=1': 'banana',
    'https://static.libertyprim.com/files/familles/fruit_de_la_passion-large.jpg?1569271767': 'passion',
    'https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_960,f_auto/DCTM_Penguin_UK_DK_AL226924_ohrtyp.jpg': 'avocado'
};

// Get references to the start and submit buttons
const startButton = document.getElementById("start");
const submitButton = document.getElementById("submit");

// Add event listeners to the buttons, so that when they are clicked, the startTimer or checkAnswer functions are called, respectively.
startButton.addEventListener("click", startTimer);
submitButton.addEventListener("click", checkAnswer);

// Disable the answer input field and the submit button, and hide the fruit image
document.getElementById("answer-input").disabled = true;
document.getElementById("submit").disabled = true;
document.getElementById("fruit-image").style.display = "none";

let remaindingTime = 60; //stores the time remaining
let timerId; //initialize the timerId variable
let preLoadedImage = 0;//stores the index of the curent image
let score = 0;//stores the score of the quiz

preloading();//Call the preloading function to store the URLs of the current and next images in local storage, so when the site is open the firt image will be arready loaded

function preloading() {//Create a function to store the imagens in the local storege
    if (preLoadedImage < images.length) {//Pre loaded the next image if the length of images is bigger than the next image to be show
        localStorage.setItem(preLoadedImage, images[preLoadedImage])//Store the URL of the current image in local storage
        preLoadedImage++;//Increment the variable
    }else{
        preLoadedImage++;//Increment the variable (this increment is to stop the quiz when get to the if (preLoadedImage >= images.length + 1) on the displayImage)
    }
}

function startTimer() {//Create a function to start the timer and the quiz   
    displayImage();//call the function to display the firt image

    document.getElementById("start").disabled = true;//Disable the start button
    document.getElementById("answer-input").disabled = false;//Enable the box to the user put the answer
    document.getElementById("submit").disabled = false;//Enable the submit button to send the answer
    document.getElementById("startText").innerHTML = "";//Remove the message "Press start"
    document.getElementById("score").textContent = "Score: 0";//Show the score counter
    document.getElementById("result").textContent = "";//Clean the result text

    timerId = setInterval(function () {//Create a function to count the timer
        if (remaindingTime > 0) {//If there is still time remaining
            remaindingTime--;//Decrement the remaining time by 1
            document.getElementById("timer").innerHTML = remaindingTime + " seconds remaining";//Update the timer element to display the remaining time
        }
        if (remaindingTime == 0) {//The timer is over
            document.getElementById("startText").disabled = false;//Enable the startText element
            document.getElementById("startText").innerText = "Time is over! Press start to restart the quiz.";//Set the text to indicate that the time is up
            document.getElementById("startText").style.color = "red";//Set the color of the startText element to red (in this case will be the message "time is over")
            reset();//Call the function reset
        }
    }, 1000); //caunt donw every 1 second
}

function checkAnswer() {//function to check the answer
    const imageSrc = document.getElementById('fruit-image').getAttribute('src');//Get the 'src' attribute of the fruitImage element
    const userAnswer = document.getElementById('answer-input').value.toLowerCase().trim();//Get the value of the user's answer input, convert to lowercase and remove any whitespace
    const rightAnswer = rightAnswers[imageSrc].toLowerCase();//Get the correct answer for the current fruitImage from the rightAnswers array, convert to lowercase
    localStorage.setItem(imageSrc, userAnswer);//Store the user's answer in local storage using the image 'src' as the key
    if (userAnswer == rightAnswer) {//Check if the answer is correct
        document.getElementById("result").textContent = `Correct! The fruit was ${rightAnswer}.`;//Display a message indicating that the answer is correct and what the correct fruit was
        document.getElementById("result").style.color = "green";//Set the text color of the message to green
        score++;//Increment the score variable
    } else {
        document.getElementById("result").textContent = `Incorrect! The fruit was ${rightAnswer}.`;//Display a message indicating that the answer is incorrect and what the correct fruit was
        document.getElementById("result").style.color = "red";//Set the text color of the message to red
    }
    document.getElementById("answer-input").value = "";//Clear the user's answer input field
    document.getElementById("score").textContent = `Score: ${score}`;//Update the score display
    displayImage();//Display the next fruit image
}

function displayImage() {//Function to display the images
    document.getElementById('fruit-image').style.display = 'block';//Set the display style of the fruit image element to block (because is hidden whe the page is loaded or reset the quiz)
    document.getElementById('fruit-image').setAttribute('src', localStorage.getItem(preLoadedImage - 1));//Set the source attribute of the fruitImage element to the current image source stored in local storage (the decrement is to take the previous image tha was pre loaded)

    if (preLoadedImage == images.length + 1) {//If the value of preLoadedImage is equal than the length of the images array plus 1
        document.getElementById("fruit-image").style.display = "none";//Hide the fruit image element
        document.getElementById("startText").style.color = "black";//Set the color of the startText element to black
        document.getElementById("startText").innerText = "You finished the quiz before the time up! Press start to restart the quiz.";//Set the text of the startText element to indicate that the user has finished the quiz
        reset();//Call the function reset
        return;//This return is to not increase the preLoadedImage, so the program will start with the right values for each posicion 
    }
    preloading();//Call the function to preload the next image
}

//When the quiz is finish the reset function will set all variables and butons to start the quiz again, also stop the timer
function reset() {
    document.getElementById("start").disabled = false;
    document.getElementById("answer-input").disabled = true;
    document.getElementById("submit").disabled = true;
    document.getElementById("timer").innerHTML = "60 seconds remaining";//Set the timer element to 60 seconds remaining again
    clearInterval(timerId);// stop the timer
    remaindingTime = 60;
    preLoadedImage = 1;
    score = 0;
}
