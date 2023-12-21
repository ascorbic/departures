import * as React from "react";
import { Layout } from "../components/layout";
import * as styles from "./main.module.css";
const IndexPage = () => {
  return (
    <Layout>
      <div className={styles.main}>
        <h1>Privacy Policy for Live Trains</h1>
        <p>Last Updated: 2023-12-21</p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to Live Trains! Our app is dedicated to providing real-time
          train times, with a strong commitment to your privacy.
        </p>

        <h2>2. Limited Data Use</h2>
        <p>
          While Live Trains does not collect or store personal data, we do
          utilize your device's location data with specific limitations:
        </p>
        <ul>
          <li>
            <strong>Location Data Use</strong>: Our app uses your location
            solely to determine the nearest train station. This process is done
            locally on your device, and your location data is never transmitted
            to our servers or any third parties.
          </li>
          <li>
            <strong>No Personal Identifiable Information (PII)</strong>: The app
            does not collect, store, or process any personal identifiers. When
            interacting with our API, only the station code or train service ID
            is used for fetching schedules.
          </li>
          <li>
            <strong>No Tracking or Analytics</strong>: We do not use cookies,
            tracking pixels, or any analytics tools to track your app usage.
          </li>
          <li>
            <strong>No Third-Party Data Sharing</strong>: Since we do not
            collect any personal data, there is no information to share or sell
            to third parties.
          </li>
        </ul>

        <h2>3. App Permissions</h2>
        <p>
          For optimal functionality, Live Trains requires access to your
          device's location services. This permission enables the app to find
          the nearest station. Rest assured, this data is processed locally and
          not stored or shared. It is never sent to any API.
        </p>

        <h2>4. Changes to Our Privacy Policy</h2>
        <p>
          We may occasionally update this privacy policy. All changes will be
          posted on this page with an updated revision date.
        </p>

        <h2>5. Contact Us</h2>
        <p>
          If you have any questions or concerns about our privacy practices,
          please feel free to contact us using the form.
        </p>

        <form
          name="contact"
          method="POST"
          data-netlify
          className={styles.form}
          netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p>
            <label>
              <span>Your Name:</span>
              <input type="text" name="name" />
            </label>
          </p>
          <p style={{ display: "none" }}>
            <label>
              Don’t fill this out if you’re human: <input name="bot-field" />
            </label>
          </p>
          <p>
            <label>
              <span>Your Email:</span>
              <input type="email" name="email" />
            </label>
          </p>

          <p>
            <label>
              <span>Message:</span> <textarea name="message"></textarea>
            </label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default IndexPage;
