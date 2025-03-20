exports.validateEmailAndGetRole = (email) => {
    const studentRegex = /^[0-9]{9}@ogrenci\.yalova\.edu\.tr$/;
    const teacherRegex = /^[a-zA-Zçşğüöı]+\.[a-zA-Zçşğüöı]+@ogretmen\.yalova\.edu\.tr$/;

    if (studentRegex.test(email)) {
        return 1; // Öğrenci rolü
    } else if (teacherRegex.test(email)) {
        return 2; // Öğretmen rolü
    } else {
        throw new Error('Invalid email format');
    }
};
