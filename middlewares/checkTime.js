function checkTime(req, res, next) {

    const currHours = new Date().getHours();
    const currMinutes = new Date().getMinutes();

    let saluto = "";

    if (currHours < 12) {
        saluto = "Buona mattinata, "
    }
    else if (currHours > 18) {
        saluto = "Buonasera, "
    }
    else {
        saluto = "Buon pomeriggio, "
    }

    console.log(saluto + "sono le ore: " + currHours + ":" + currMinutes);

    next();
}

module.exports = checkTime