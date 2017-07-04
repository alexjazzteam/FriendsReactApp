let friends = [];

for (let i = 1; i <=50; i++) {
    let randomAge = getAge(1, 100);
    let randomDate = getBirthDate(randomAge);

    friends.push({
        name: "Name" + i,
        lastName: "Last name" + i,
        age: randomAge,
        gender: getGender(i),
        birthDate: randomDate
    });
}

function getGender(number) {
    return (number % 2 === 0) ? "Man" : "Woman";
}

function getAge(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getBirthDate(age) {
    let randomMonth = Math.random() * 11 + 1;
    let randomDay = Math.random() * 30 + 1;

    let nowYear = new Date().getFullYear();

    let yearBirth = nowYear - age;

    let randomDate = new Date(yearBirth, randomMonth, randomDay);

    return randomDate.getDate() + "." + randomDate.getMonth() + "." + randomDate.getFullYear();
}

module.exports = friends;