import React, { useState } from "react";
import "./App.css";
import FlyySDK from "flyy-web-sdk-staging";
import { CodeBlock, dracula } from "react-code-blocks";

const flyySDK = new FlyySDK();

function App() {
  const [partnerId, setPartnerId] = useState("");
  const [packageName, setPackageName] = useState("");
  const [environment, setEnvironment] = useState("STAGING");
  const [partnerKey, setPartnerKey] = useState("");
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [isCustomQuizPageEnabled, setIsCustomQuizPageEnabled] = useState("YES");
  const [isCustomLogoEnabled, setIsCustomLogoEnabled] = useState("YES");
  const [isTitle, setIsTitle] = useState("Thank You");
  const [isDescription, setIsDescription] = useState(
    "You are wise in your financial decisions."
  );
  const [isDescriptionColour, setIsDescriptionColour] = useState("#808080");
  const [isTitleColour, setIsTitleColour] = useState("#000000");
  const [isButtonTextColour, setIsButtonTextColour] = useState("#FFFFFF");
  const [isButtonColour, setIsButtonColour] = useState("#C7222A");
  const [isSeekbarColour, setIsSeekbarColour] = useState("#0A6A34");
  const [isSelectedColour, setIsSelectedColour] = useState("#C7222A");
  const [referralInfoMsg, setReferralInfoMsg] = useState("");
  const [referralHistoryMessage, setReferralHistoryMessage] = useState("");
  const [productKey, setProductKey] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [passReferrer, setPassReferrer] = useState("");
  const [passDeviceID, setPassDeviceID] = useState("");

  flyySDK.startReferralTracking();

  var data = {
    package_name: packageName,
    partner_id: partnerId,
    ext_user_token: "nAlyijFANB",
    attachMode: "popup",
    //attachMode: 'drawer',
    environment: environment,
    device_id: "flyy-demo-app",
    isCustomQuizPageEnabled: isCustomQuizPageEnabled,
    isCustomQuizLogoEnabled: isCustomLogoEnabled,
    isTitle: isTitle,
    isDescription: isDescription,
    isDescriptionColour: isDescriptionColour,
    isTitleColour: isTitleColour,
    isButtonTextColour: isButtonTextColour,
    isButtonColour: isButtonColour,
    isSeekbarColour: isSeekbarColour,
    isSelectedColour: isSelectedColour,
    referralInfoMsg: referralInfoMsg,
    referralHistoryMessage: referralHistoryMessage,
    userName: userName,
    passReferrer: passReferrer,
    passDeviceID: passDeviceID,
  };

  const code = `const flyySDK = new FlyySDK();

    call this in your token fetch call
    var data = {
        package_name: "<Your-Package-name>",
        partner_id: "<your-partner-id>",
        ext_user_token: "<user-token-from-partner-api>",
        attachMode: 'popup',
        //attachMode: 'drawer',
        //attachMode: 'chatbox',
        //attachMode: 'embed',s
        environment: "STAGING"
    };
    (function () {
        //If the attachMode is Chatbox;
        flyySDK.setActionButtonPosition('left');
        flyySDK.setActionButtonColor('#faa232');
        flyySDK.setActionButtonText('Reward Points');
        flyySDK.setUserName("user name set by method");
        flyySDK.setUserBankCredntials({acc_type: "upi/bank", upi_id: "<upi_id>", "acc_num": "", "ifsc": "", "name":""})
        flyySDK.init(JSON.stringify(data));
    })();   `;

  const language = "js";

  const startFlyy = async () => {
    console.log({ data });
    if (!partnerId) {
      alert("Please enter Partner ID");
      return;
    }
    if (environment === "STAGING" && !partnerKey) {
      alert("Please enter Partner Key");
      return;
    }
    if (environment === "PRODUCTION" && (!token || !deviceId)) {
      alert("Please enter Token and Device ID for PRODUCTION environment");
      return;
    }

    console.log("BODY USERNAME : ", userName);

    try {
      // Prepare token & device_id
      if (environment === "PRODUCTION") {
        data.ext_user_token = token;
        data.device_id = deviceId;
      } else {
        const baseUrl = "https://stage-partner-api.theflyy.com/v1";
        const response = await fetch(
          `${baseUrl}/${partnerId}/user/${userName}/user_token`,
          {
            method: "POST",
            headers: {
              "partner-key": partnerKey,
              "content-type": "application/json",
            },
            body: JSON.stringify({ is_new: "false", username: userName }),
          }
        );

        const res = await response.json();
        data.ext_user_token = res.token;
        data.device_id = res.device_id;
      }

      // Set SDK configurations
      flyySDK.setActionButtonPosition("left");
      flyySDK.setActionButtonColor("#faa232");
      flyySDK.setActionButtonText("Reward Points");

      // Set theme colors
      flyySDK.setFlyyThemeColor({
        topBgColor: "#a52b2b",
        mainBgColor: "#e8f00c",
        shadowBgColor: "#1d2678",
        offersCardBgColor: "#0cf010",
        buttonBGColor: "#2B49A5",
        headingTextColor: "#ed6028",
        subHeadingTextColor: "#000000",
        extraTextColor: "#585957",
        labelsTextColor: "#000000",
        walletCardColor: "#d028ed",
        walletInnerCardColor: "#28d9ed",
        walletSubHeadingColor: "#000000",
        scratchCardBgColor: "#f55302",
        scratchCardInnerColor: "#0cf0e5",
      });

      // Set user info
      flyySDK.setUserName(userName);
      flyySDK.setUserBankCredntials({ acc_type: "upi", upi_id: "vinuyer@ybl" });

      // Initialize SDK
      flyySDK.init(JSON.stringify(data));
    } catch (error) {
      console.error("Error initializing Flyy:", error);
      alert(
        "Failed to initialize Flyy. Please check your configuration and try again."
      );
    }
  };

  return (
    <div className="parent-container">
      <div className="container top-container">
        <h2>Flyy Web SDK</h2>

        <div className={"mt-2"}>
          <h4>Install the Package using npm</h4>
        </div>

        <CodeBlock text={"npm i fly-web-sdk"} />

        <h4>Initialize the Package using the consturctor</h4>
        <div className={"code-block-init"}>
          <CodeBlock
            text={code}
            language={language}
            showLineNumbers={true}
            theme={dracula}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <h4>Enter configuration details</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label>Partner ID:</label>
              <input
                value={partnerId}
                onChange={(e) => setPartnerId(e.target.value)}
                style={{ margin: "5px" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label>Package Name:</label>
              <input
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                style={{ margin: "5px" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label>Environment:</label>
              <select
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                style={{ margin: "5px" }}
              >
                <option value="STAGING">STAGING</option>
                <option value="PRODUCTION">PRODUCTION</option>
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label>Show Custom Quiz Page :</label>
              <select
                value={isCustomQuizPageEnabled}
                onChange={(e) => setIsCustomQuizPageEnabled(e.target.value)}
                style={{ margin: "5px" }}
              >
                <option value="YES">Yes</option>
                <option value="NO">No</option>
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label>Show Custom Logo :</label>
              <select
                value={isCustomLogoEnabled}
                onChange={(e) => setIsCustomLogoEnabled(e.target.value)}
                style={{ margin: "5px" }}
              >
                <option value="YES">Yes</option>
                <option value="NO">No</option>
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label>Thank You Title:</label>
              <input
                value={isTitle}
                onChange={(e) => setIsTitle(e.target.value)}
                style={{ margin: "5px" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label>Thank You Description:</label>
              <input
                value={isDescription}
                onChange={(e) => setIsDescription(e.target.value)}
                style={{ margin: "5px" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label>Button Text Colour:</label>
              <input
                value={isButtonTextColour}
                onChange={(e) => setIsButtonTextColour(e.target.value)}
                style={{ margin: "5px" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label>Button Background Colour:</label>
              <input
                value={isButtonColour}
                onChange={(e) => setIsButtonColour(e.target.value)}
                style={{ margin: "5px" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label>Seekbar Colour:</label>
              <input
                value={isSeekbarColour}
                onChange={(e) => setIsSeekbarColour(e.target.value)}
                style={{ margin: "5px" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label>Selected option Border Colour:</label>
              <input
                value={isSelectedColour}
                onChange={(e) => setIsSelectedColour(e.target.value)}
                style={{ margin: "5px" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label>Description Colour:</label>
              <input
                value={isDescriptionColour}
                onChange={(e) => setIsDescriptionColour(e.target.value)}
                style={{ margin: "5px" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label>Primary Text Colour:</label>
              <input
                value={isTitleColour}
                onChange={(e) => setIsTitleColour(e.target.value)}
                style={{ margin: "5px" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label>Referral History Info Message:</label>
              <input
                value={referralInfoMsg}
                onChange={(e) => setReferralInfoMsg(e.target.value)}
                style={{ margin: "5px" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label>Referral History Message:</label>
              <input
                value={referralHistoryMessage}
                onChange={(e) => setReferralHistoryMessage(e.target.value)}
                style={{ margin: "5px" }}
              />
            </div>

            {environment === "STAGING" && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <label>Partner Key:</label>
                <input
                  value={partnerKey}
                  onChange={(e) => setPartnerKey(e.target.value)}
                  style={{ margin: "5px" }}
                />
              </div>
            )}
            {environment === "PRODUCTION" && (
              <>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <label>Token:</label>
                  <input
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    style={{ margin: "5px" }}
                  />
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <label>Device ID:</label>
                  <input
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                    style={{ margin: "5px" }}
                  />
                </div>
              </>
            )}
          </div>

          <h4>Enter user id to generate token in Flyy and Initilize Flyy</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              style={{ margin: "5px" }}
            />
            <button
              className={"form-control btn-primary mt-2  submit-button"}
              style={{ width: "90px" }}
              onClick={() => {
                startFlyy();
              }}
            >
              Init Flyy
            </button>
          </div>
        </div>

        <h4>Following Methods are availabe for various screens to call.</h4>
        <div className="mb-8">
          {/* <h2 className="text-xl font-semibold mb-4">API Testing</h2> */}
          <div
            style={{
              gap: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <input
              value={productKey}
              onChange={(e) => setProductKey(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Product Key"
            />
            <button
              // onClick={getProductDetails}
              onClick={() => flyySDK.getProductDetails(productKey)}
              disabled={loading}
              className="text-white px-4 py-2 rounded font-medium"
              style={{ backgroundColor: "#16a349" }}
            >
              Get Product Details
            </button>
          </div>
          <div
            style={{
              gap: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <input
              value={passReferrer}
              onChange={(e) => setPassReferrer(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Referrer Key"
            />
            <input
              value={passDeviceID}
              onChange={(e) => setPassDeviceID(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Device ID"
            />

            <button
              // onClick={verifyProductDetails}
              onClick={() =>
                flyySDK.verifyProductCode(passReferrer, passDeviceID)
              }
              disabled={loading}
              className="text-white px-4 py-2 rounded font-medium"
              style={{ backgroundColor: "#ea580b" }}
            >
              Verify Product Details
            </button>
          </div>
        </div>

        <div className="app d-flex flex-wrap mb-3">
          <div className={"card m-2"} style={{ width: 20 + "rem" }}>
            <h5 className={"card-header"}>Invite & Earn QR Method</h5>
            <div className={"card-body"}>
              <h6 className={"card-subtitle mb-2 text-muted"}>
                To Open Invite & Earn QR Screen
              </h6>
              <CodeBlock
                text={"flyySDK.openInviteQRScreen(data)"}
                language={language}
                theme={dracula}
              />
              <p className={"card-text"}>
                This Method is to Open Invite & Earn QR Screen.
              </p>
              <button
                onClick={() => flyySDK.openNewInviteScreen(data)}
                className={"form-control btn-primary mt-2  submit-button"}
              >
                Invite & Earn QR
              </button>
            </div>
          </div>

          <div className={"card m-2"} style={{ width: 20 + "rem" }}>
            <h5 className={"card-header"}>Poll List Method</h5>
            <div className={"card-body"}>
              <h6 className={"card-subtitle mb-2 text-muted"}>
                To Open Poll List Screen
              </h6>
              <CodeBlock
                text={"flyySDK.openPollList(data)"}
                language={language}
                theme={dracula}
              />
              <p className={"card-text"}>
                This Method is to Open Poll List Screen.
              </p>
              <button
                onClick={() => flyySDK.openPollListScreen(data)}
                className={"form-control btn-primary mt-2  submit-button"}
              >
                Poll List
              </button>
            </div>
          </div>
          <div className={"card m-2"} style={{ width: 20 + "rem" }}>
            <h5 className={"card-header"}>Survey List Method</h5>
            <div className={"card-body"}>
              <h6 className={"card-subtitle mb-2 text-muted"}>
                To Open Survey List Screen
              </h6>
              <CodeBlock
                text={"flyySDK.openSurveyList(data)"}
                language={language}
                theme={dracula}
              />
              <p className={"card-text"}>
                This Method is to Open Survey List Screen.
              </p>
              <button
                onClick={() => flyySDK.openSurveyListScreen(data)}
                className={"form-control btn-primary mt-2  submit-button"}
              >
                Survey List
              </button>
            </div>
          </div>

          <div className={"card m-2"} style={{ width: 20 + "rem" }}>
            <h5 className={"card-header"}>Trivia List Method</h5>
            <div className={"card-body"}>
              <h6 className={"card-subtitle mb-2 text-muted"}>
                To Open Trivia List Screen
              </h6>
              <CodeBlock
                text={"flyySDK.openTriviaList(data)"}
                language={language}
                theme={dracula}
              />
              <p className={"card-text"}>
                This Method is to Open Trivia List Screen.
              </p>
              <button
                onClick={() => flyySDK.openTriviaListScreen(data)}
                className={"form-control btn-primary mt-2  submit-button"}
              >
                Trivia List
              </button>
            </div>
          </div>

          <div className={"card m-2"} style={{ width: 20 + "rem" }}>
            <h5 className={"card-header"}>Offers Method</h5>
            <div className={"card-body"}>
              <h6 className={"card-subtitle mb-2 text-muted"}>
                To Open Offers Screen
              </h6>
              <CodeBlock
                text={"flyySDK.clickToOpenSDK(data)"}
                language={language}
                theme={dracula}
              />
              <p className={"card-text"}>
                This Method is to Open Offers Screen.
              </p>
              <button
                onClick={() => flyySDK.clickToOpenSDK(data)}
                className={"form-control btn-primary mt-2  submit-button"}
              >
                Offers
              </button>
            </div>
          </div>

          <div className={"card m-2"} style={{ width: 20 + "rem" }}>
            <h5 className={"card-header"}>Spin Wheel Method</h5>
            <div className={"card-body"}>
              <h6 className={"card-subtitle mb-2 text-muted"}>
                To Open Spin the Wheel
              </h6>
              <CodeBlock
                text={"flyySDK.openSpinTheWheel()"}
                language={language}
                theme={dracula}
              />
              <p className={"card-text"}>
                This Method is to Open the Spin the Wheel Screen. It will only
                open when there is a live offer is present
              </p>
              <button
                onClick={() => flyySDK.openSpinTheWheel()}
                className={"form-control btn-primary mt-2 submit-button"}
              >
                Spin Wheel
              </button>
            </div>
          </div>

          <div className={"card m-2"} style={{ width: 20 + "rem" }}>
            <h5 className={"card-header"}>Wallet Method</h5>
            <div className={"card-body"}>
              <h6 className={"card-subtitle mb-2 text-muted"}>
                To Open Wallet Screen
              </h6>
              <CodeBlock
                text={"flyySDK.openWalletScreen()"}
                language={language}
                theme={dracula}
              />
              <p className={"card-text"}>
                This Method is to Open the Wallet Screen.
              </p>
              <button
                onClick={() => flyySDK.openWalletScreen()}
                className={"form-control btn-primary mt-2 submit-button"}
              >
                Open Wallet
              </button>
            </div>
          </div>

          <div className={"card m-2"} style={{ width: 20 + "rem" }}>
            <h5 className={"card-header"}>Account Method</h5>
            <div className={"card-body"}>
              <h6 className={"card-subtitle mb-2 text-muted"}>
                To Open Account Screen
              </h6>
              <CodeBlock
                text={"flyySDK.openRedeemScreen()"}
                language={language}
                theme={dracula}
              />
              <p className={"card-text"}>
                This Method is to Open the Account Screen.
              </p>
              <button
                onClick={() => flyySDK.openRedeemScreen()}
                className={"form-control btn-primary mt-2 submit-button"}
              >
                Account
              </button>
            </div>
          </div>

          <div className={"card m-2"} style={{ width: 20 + "rem" }}>
            <h5 className={"card-header"}>Rewards Method</h5>
            <div className={"card-body"}>
              <h6 className={"card-subtitle mb-2 text-muted"}>
                To Open Rewards Screen
              </h6>
              <CodeBlock
                text={"flyySDK.openRewardsScreen()"}
                language={language}
                theme={dracula}
              />
              <p className={"card-text"}>
                This Method is to Open the User Rewards Screen.
              </p>
              <button
                onClick={() => flyySDK.openRewardsScreen()}
                className={"form-control btn-primary mt-2 submit-button"}
              >
                Open Rewards
              </button>
            </div>
          </div>

          <div className={"card m-2"} style={{ width: 20 + "rem" }}>
            <h5 className={"card-header"}>Gift Cards Method</h5>
            <div className={"card-body"}>
              <h6 className={"card-subtitle mb-2 text-muted"}>
                To Open Gift Cards Screen
              </h6>
              <CodeBlock
                text={"flyySDK.openGiftCardsScreen()"}
                language={language}
                theme={dracula}
              />
              <p className={"card-text"}>
                This Method is to Open the Gift Cards Redemption Screen.
              </p>
              <button
                onClick={() => flyySDK.openGiftCardsScreen()}
                className={"form-control btn-primary mt-2 submit-button"}
              >
                Gift Cards
              </button>
            </div>
          </div>

          <div className={"card m-2"} style={{ width: 20 + "rem" }}>
            <h5 className={"card-header"}>Tourmament Method</h5>
            <div className={"card-body"}>
              <h6 className={"card-subtitle mb-2 text-muted"}>
                To Open Tournaments Screen
              </h6>
              <CodeBlock
                text={"flyySDK.openTournamentsScreen()"}
                language={language}
                theme={dracula}
              />
              <p className={"card-text"}>
                This Method is to Open the Games and Tournaments Screen.
              </p>
              <button
                onClick={() => flyySDK.openTournamentsScreen()}
                className={"form-control btn-primary mt-2 submit-button"}
              >
                Tournaments
              </button>
            </div>
          </div>

          <div className={"card m-2"} style={{ width: 20 + "rem" }}>
            <h5 className={"card-header"}>Referral Method</h5>
            <div className={"card-body"}>
              <h6 className={"card-subtitle mb-2 text-muted"}>
                To Open Referral Screen
              </h6>
              <CodeBlock
                text={"flyySDK.openReferralscreen()"}
                language={language}
                theme={dracula}
              />
              <p className={"card-text"}>
                This Method is to Open the Referrals Screen, where the user's
                unique Referral code is shown.
              </p>
              <button
                onClick={() => flyySDK.openReferralscreen()}
                className={"form-control btn-primary mt-2 submit-button"}
              >
                Referrals
              </button>
            </div>
          </div>

          <div className={"card m-2"} style={{ width: 20 + "rem" }}>
            <h5 className={"card-header"}>Quiz Zone Method</h5>
            <div className={"card-body"}>
              <h6 className={"card-subtitle mb-2 text-muted"}>
                To Open Quiz Zone Screen
              </h6>
              <CodeBlock
                text={"flyySDK.openQuizZoneScreen()"}
                language={language}
                theme={dracula}
              />
              <p className={"card-text"}>
                This Method is to Open the Quiz Listing Screen
              </p>
              <button
                onClick={() => flyySDK.openQuizZoneScreen()}
                className={"form-control btn-primary mt-2 submit-button"}
              >
                Quiz
              </button>
            </div>
          </div>

          <div className={"card m-2"} style={{ width: 20 + "rem" }}>
            <h5 className={"card-header"}>Transactions Method</h5>
            <div className={"card-body"}>
              <h6 className={"card-subtitle mb-2 text-muted"}>
                To Open Transactions Screen
              </h6>
              <CodeBlock
                text={"flyySDK.openTransactionsScreen('Curency type as Param')"}
                language={language}
                theme={dracula}
              />
              <p className={"card-text"}>
                Params Accepted - 'String' : Name of the currency to which the
                transaction needs to be shown
              </p>
              <button
                onClick={() => flyySDK.openTransactionsScreen("Cash")}
                className={"form-control btn-primary mt-2 submit-button"}
              >
                Transation
              </button>
            </div>
          </div>

          <div className={"card m-2"} style={{ width: 20 + "rem" }}>
            <h5 className={"card-header"}>Transactions Method</h5>
            <div className={"card-body"}>
              <h6 className={"card-subtitle mb-2 text-muted"}>
                To Open Transactions Screen
              </h6>
              <CodeBlock
                text={"flyySDK.openTransactionsScreen('Curency type as Param')"}
                language={language}
                theme={dracula}
              />
              <p className={"card-text"}>
                Params Accepted - 'String' : Name of the currency to which the
                transaction needs to be shown
              </p>
              <button
                onClick={() => flyySDK.openTransactionsScreen("Coins")}
                className={"form-control btn-primary mt-2 submit-button"}
              >
                Points History
              </button>
            </div>
          </div>

          <div className={"card m-2"} style={{ width: 20 + "rem" }}>
            <h5 className={"card-header"}>Invite and Earn Method</h5>
            <div className={"card-body"}>
              <h6 className={"card-subtitle mb-2 text-muted"}>
                To Open Invite and Earn Screen
              </h6>
              <CodeBlock
                text={"flyySDK.openInviteAndEarnOffer()"}
                language={language}
                theme={dracula}
              />
              <p className={"card-text"}>
                It will only work when there is any live offer available
              </p>
              <button
                onClick={() => flyySDK.openInviteAndEarnOffer()}
                className={"form-control btn-primary mt-2 submit-button"}
              >
                Invite And Earn
              </button>
            </div>
          </div>

          <div className={"card m-2"} style={{ width: 20 + "rem" }}>
            <h5 className={"card-header"}>CheckIn Method</h5>
            <div className={"card-body"}>
              <h6 className={"card-subtitle mb-2 text-muted"}>
                To Open CheckIn Screen
              </h6>
              <CodeBlock
                text={"flyySDK.openDailyCheckInOffer()"}
                language={language}
                theme={dracula}
              />
              <p className={"card-text"}>
                It will only work when there is any live offer available
              </p>
              <button
                onClick={() => flyySDK.openDailyCheckInOffer()}
                className={"form-control btn-primary mt-2 submit-button"}
              >
                Daily CheckIn
              </button>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default App;
