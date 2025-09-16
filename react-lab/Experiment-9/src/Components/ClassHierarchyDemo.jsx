import PersonCard from './PersonCard.jsx';

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age); 
    this.grade = grade;
  }

  getInfo() {
    return `${super.getInfo()}, Grade: ${this.grade}`;
  }
}

class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  getInfo() {
    return `Name: ${this.name}, Age: ${this.age}, Subject: ${this.subject}`;
  }
}


function ClassHierarchyDemo() {
  const student = new Student('Krrish', 18, '12th');
  const teacher = new Teacher('Mr. Harbinder', 30, 'Full Stack');

  return (
    <div className="card">
      <h1>Person Class Hierarchy Demo</h1>
      
      <PersonCard 
        title="Student Instance Details" 
        details={student.getInfo()} 
      />
      
      <PersonCard 
        title="Teacher Instance Details" 
        details={teacher.getInfo()} 
      />
    </div>
  );
}

export default ClassHierarchyDemo;
