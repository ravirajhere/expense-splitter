// State
let members = [];
let expenses = [];

// Elements
const groupName = document.getElementById("groupName");
const memberInput = document.getElementById("memberInput");
const addMemberBtn = document.getElementById("addMemberBtn");
const memberList = document.getElementById("memberList");
const expenseDesc = document.getElementById("expenseDesc");
const expenseAmount = document.getElementById("expenseAmount");
const paidBy = document.getElementById("paidBy");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const expenseList = document.getElementById("expenseList");
const settlement = document.getElementById("settlement");
const resetBtn = document.getElementById("resetBtn");

// Load from localStorage
function load() {
  const saved = localStorage.getItem("expenseSplitter");
  if (saved) {
    const data = JSON.parse(saved);
    members = data.members || [];
    expenses = data.expenses || [];
    groupName.value = data.groupName || "";
  }
}

// Save to localStorage
function save() {
  localStorage.setItem("expenseSplitter", JSON.stringify({
    members,
    expenses,
    groupName: groupName.value
  }));
}

// Add member
addMemberBtn.addEventListener("click", () => {
  const name = memberInput.value.trim();
  if (!name || members.includes(name)) return;
  members.push(name);
  memberInput.value = "";
  render();
  save();
});

// Add expense
addExpenseBtn.addEventListener("click", () => {
  const desc = expenseDesc.value.trim();
  const amount = parseFloat(expenseAmount.value);
  const payer = paidBy.value;

  if (!desc || !amount || !payer) {
    alert("Sab fields bharo!");
    return;
  }

  expenses.push({ desc, amount, payer });
  expenseDesc.value = "";
  expenseAmount.value = "";
  render();
  save();
});

// Reset
resetBtn.addEventListener("click", () => {
  if (!confirm("Sab kuch delete ho jayega. Sure?")) return;
  members = [];
  expenses = [];
  groupName.value = "";
  localStorage.removeItem("expenseSplitter");
  render();
});

// Render everything
function render() {
  // Members
  memberList.innerHTML = members.map((m, i) =>
    `<div class="chip">${m} <button onclick="removeMember(${i})">×</button></div>`
  ).join("");

  // PaidBy dropdown
  paidBy.innerHTML = '<option value="">Who paid?</option>' +
    members.map(m => `<option value="${m}">${m}</option>`).join("");

  // Expenses
  expenseList.innerHTML = expenses.length === 0
    ? '<div style="color:#94a3b8;font-size:13px;">No expenses yet</div>'
    : expenses.map((e, i) =>
        `<div class="expense-item">
          <span>${e.desc} — <b>${e.payer}</b> paid</span>
          <span>₹${e.amount} <button onclick="removeExpense(${i})" style="background:none;padding:0;color:#ef4444;margin-left:8px;">×</button></span>
        </div>`
      ).join("");

  // Settlement
  calculateSettlement();
}

function removeMember(i) {
  members.splice(i, 1);
  render();
  save();
}

function removeExpense(i) {
  expenses.splice(i, 1);
  render();
  save();
}

function calculateSettlement() {
  if (members.length === 0 || expenses.length === 0) {
    settlement.textContent = "Add members and expenses to see settlement";
    return;
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const perPerson = total / members.length;

  // Kitna har member ne paya
  const paid = {};
  members.forEach(m => paid[m] = 0);
  expenses.forEach(e => paid[e.payer] += e.amount);

  // Kitna har member ko dena/lena hai
  const balance = {};
  members.forEach(m => balance[m] = paid[m] - perPerson);

  // Settlement nikalo
  const debtors = members.filter(m => balance[m] < -0.01)
    .map(m => ({ name: m, amount: -balance[m] }))
    .sort((a, b) => b.amount - a.amount);

  const creditors = members.filter(m => balance[m] > 0.01)
    .map(m => ({ name: m, amount: balance[m] }))
    .sort((a, b) => b.amount - a.amount);

  const transactions = [];
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const amount = Math.min(debtors[i].amount, creditors[j].amount);
    transactions.push(`${debtors[i].name} → ${creditors[j].name}: ₹${amount.toFixed(2)}`);
    debtors[i].amount -= amount;
    creditors[j].amount -= amount;
    if (debtors[i].amount < 0.01) i++;
    if (creditors[j].amount < 0.01) j++;
  }

  settlement.innerHTML = `
    <div style="margin-bottom:10px;color:#94a3b8;font-size:13px;">
      Total: ₹${total.toFixed(2)} | Per person: ₹${perPerson.toFixed(2)}
    </div>
    ${transactions.length === 0 
      ? '<div style="color:#22c55e;">Sab settle hai! 🎉</div>'
      : transactions.map(t => `<div class="settlement-item">${t}</div>`).join("")
    }
  `;
}

// Group name save
groupName.addEventListener("input", save);

// Init
load();
render();
