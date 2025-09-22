const readline = require("readline");

// Employee list (in-memory array)
let employees = [];

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Menu function
function showMenu() {
  console.log("\n===== Employee Management System =====");
  console.log("1. Add Employee");
  console.log("2. List Employees");
  console.log("3. Remove Employee by ID");
  console.log("4. Exit");
  rl.question("Choose an option: ", handleMenu);
}

// Handle menu options
function handleMenu(option) {
  switch (option) {
    case "1":
      rl.question("Enter Employee Name: ", (name) => {
        rl.question("Enter Employee ID: ", (id) => {
          employees.push({ id, name });
          console.log(`✅ Employee ${name} added successfully!`);
          showMenu();
        });
      });
      break;

    case "2":
      console.log("\n👥 Employee List:");
      if (employees.length === 0) {
        console.log("No employees found.");
      } else {
        employees.forEach((emp, index) => {
          console.log(`${index + 1}. ${emp.name} (ID: ${emp.id})`);
        });
      }
      showMenu();
      break;

    case "3":
      rl.question("Enter Employee ID to remove: ", (id) => {
        const index = employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
          console.log(`🗑 Removed Employee: ${employees[index].name}`);
          employees.splice(index, 1);
        } else {
          console.log("❌ Employee not found!");
        }
        showMenu();
      });
      break;

    case "4":
      console.log("👋 Exiting... Goodbye!");
      rl.close();
      break;

    default:
      console.log("❌ Invalid option, please try again.");
      showMenu();
  }
}

// Start the application
showMenu();
