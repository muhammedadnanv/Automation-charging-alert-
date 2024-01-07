const { execSync } = require('child_process');
const say = require('say');

// Function to check if the phone is charging
const isPhoneCharging = () => {
  try {
    // Use a platform-specific command to check the charging status
    const chargingStatus = execSync('node index.js', { encoding: 'utf-8' });
    return chargingStatus.trim() === 'charging';
  } catch (error) {
    console.error('Error checking charging status:', error.message);
    return false;
  }
};

// Function to speak a message based on charging status
const speakChargingStatus = () => {
  const charging = isPhoneCharging();
  const message = charging ? 'Your device is using electrical power.' : 'Your phone needs electrical power.';

  say.speak(message, 'Microsoft David Desktop - English (United States)', 1.0, (err) => {
    if (err) {
      console.error('Error speaking message:', err);
    } else {
      console.log('Message spoken successfully.');
    }
  });
};

// Speak the charging status every minute (adjust the cron expression as needed)
setInterval(() => {
  console.log('Checking charging status...');
  speakChargingStatus();
}, 60 * 1000); // 60 seconds * 1000 milliseconds
