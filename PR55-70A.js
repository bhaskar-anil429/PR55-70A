function decodeUplink(input) {
  let bytes = input.bytes;

  // Decode each part of the payload
  let firmwareVersion = bytes[0];
  let voltage = bytes[1];
  let deviceType = bytes[2];
  let messageStatus = bytes[3];

  // Decode temperature (5th and 6th bytes, signed 16-bit, divided by 100)
  let temperature = ((bytes[4] << 8) | bytes[5]) / 100;
  if (temperature >= 327.68) {
    temperature -= 655.36; // Adjust for signed 16-bit value
  }

  // Decode humidity (7th and 8th bytes, unsigned 16-bit, divided by 100)
  let humidity = ((bytes[6] << 8) | bytes[7]) / 100;

  // Return the decoded values
  return {
    data: {
      firmwareVersion: firmwareVersion,
      voltage: voltage,
      deviceType: deviceType,
      messageStatus: messageStatus,
      temperature: temperature,
      humidity: humidity
    }
  };
}
