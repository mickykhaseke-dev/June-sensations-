 // ==================== PAYMENT PLACEHOLDER ====================
function processPayment(amount) {
  alert(`Processing payment of KSh ${amount.toFixed(2)}... (Payment gateway placeholder)`);
}

// ==================== BOOKING HANDLER ====================
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    alert(`Booking confirmed for ${name}\nService: ${service}\nDate: ${date}\nTime: ${time}`);
    bookingForm.reset();
  });
}

// ==================== JOB ENQUIRY HANDLER ====================
const enquiryForm = document.getElementById("enquiryForm");
if (enquiryForm) {
  enquiryForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("enquiryName").value;
    const email = document.getElementById("enquiryEmail").value;
    const message = document.getElementById("enquiryMessage").value;

    alert(`Thank you ${name}! Your job enquiry has been received.\nWe’ll contact you at ${email}.`);
    enquiryForm.reset();
  });
}

// ==================== OWNER DASHBOARD HANDLER ====================
if (document.getElementById("earningsForm")) {
  let totalBalance = 0;
  let savings = 0;

  document.getElementById("earningsForm").addEventListener("submit", e => {
    e.preventDefault();
    const dailyEarnings = Number(document.getElementById("dailyEarnings").value);

    if (dailyEarnings <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const dailySave = dailyEarnings * 0.10;
    const dailyNet = dailyEarnings - dailySave;

    totalBalance += dailyNet;
    savings += dailySave;

    document.getElementById("totalBalance").textContent = `Total Balance: KSh ${totalBalance.toFixed(2)}`;
    document.getElementById("savings").textContent = `Savings (10%): KSh ${savings.toFixed(2)}`;
    document.getElementById("message").textContent = "✅ 10% saved automatically and added to savings.";
    document.getElementById("earningsForm").reset();
  });

  // Withdraw Daily Balance — anytime
  document.getElementById("withdrawDailyBtn").addEventListener("click", () => {
    if (totalBalance > 0) {
      alert(`💵 Withdrawn: KSh ${totalBalance.toFixed(2)} from your daily balance.`);
      totalBalance = 0;
      document.getElementById("totalBalance").textContent = `Total Balance: KSh ${totalBalance.toFixed(2)}`;
    } else {
      alert("No daily balance available to withdraw.");
    }
  });

  // Withdraw Savings — only on 29th
  document.getElementById("withdrawSavingsBtn").addEventListener("click", () => {
    const today = new Date();
    if (today.getDate() === 29) {
      if (savings > 0) {
        alert(`🎉 Withdrawn: KSh ${savings.toFixed(2)} from your savings.`);
        savings = 0;
        document.getElementById("savings").textContent = `Savings (10%): KSh ${savings.toFixed(2)}`;
      } else {
        alert("No savings available to withdraw.");
      }
    } else {
      alert("❌ Withdrawals of savings are only allowed on the 29th of each month.");
    }
  });
}