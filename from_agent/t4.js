// Practice 4: filter + nested reduce (similar to sumSpecialOrders)
//
// Write a function getTopStudents(students) that returns an array of objects { name, avg }.
//
// A student is counted only if:
//   - active is true, and
//   - every course has grade >= 6 (passed everything), and
//   - at least one course has grade 10
//
// avg is the WEIGHTED average of the student's grades:
//   avg = sum(grade * credits) / sum(credits)
// rounded to 2 decimals (hint: Number(x.toFixed(2))).
//
// The result is sorted by avg from highest to lowest.
//
// Rule: if you use for / while loops you get max 50% of the points.
//       Use only array methods (filter, map, reduce, some, every, sort, ...).

function getTopStudents(students) {
    return students
        .filter(s => s.active)
        .filter(s => s.courses.every(course => course.grade >= 6))
        .filter(s => s.courses.some(course => course.grade === 10))
        .map((student) => {
            const totalGradesStudent = student.courses
                .reduce((acc, curr) => {
                    return acc + curr.grade * curr.credits;
                }, 0)
            const avgGradeStudent = totalGradesStudent / student.courses.reduce((acc, curr) => acc + curr.credits, 0);
            return {name: student.name, avg: Number(avgGradeStudent.toFixed(2))}
        }).sort((a, b) => b.avg - a.avg);
}

const students = [
    {
        name: "Ana", active: true, courses: [
            { name: "WP", grade: 10, credits: 6 },
            { name: "DB", grade: 8,  credits: 6 },
            { name: "OS", grade: 9,  credits: 3 }
        ]
    },
    {
        name: "Bojan", active: true, courses: [
            { name: "WP", grade: 10, credits: 6 },
            { name: "DB", grade: 5,  credits: 6 }
        ]
    },
    {
        name: "Ivana", active: false, courses: [
            { name: "WP", grade: 10, credits: 6 }
        ]
    },
    {
        name: "Marko", active: true, courses: [
            { name: "WP", grade: 9, credits: 6 },
            { name: "DB", grade: 9, credits: 6 }
        ]
    },
    {
        name: "Elena", active: true, courses: [
            { name: "WP", grade: 10, credits: 3 },
            { name: "DB", grade: 10, credits: 6 },
            { name: "OS", grade: 7,  credits: 6 }
        ]
    },
    {
        name: "Petar", active: true, courses: [
            { name: "WP", grade: 10, credits: 6 }
        ]
    }
];

console.log(getTopStudents(students))
// expected: [ { name: 'Petar', avg: 10 }, { name: 'Ana', avg: 9 }, { name: 'Elena', avg: 8.8 } ]
