import React, { FormEvent, useEffect, useState } from "react";
import { useGetRequest } from "../../hooks";
import { useParams } from "react-router-dom";

import { findTheShortCodeInAUrl, validateUrl } from "../../utils";
import { Footer, Alert } from "../../components/";
import { ErrorsTextAlert } from "../../constants/";

import "./styles.css";

const INCLUDE_TEST = "https://shortly.cloud/";

export default function SeeClickedAmount() {
  const [inputField, setInputField] = useState<any>();
  const [shortCode, setShortCode] = useState("");
  const [errors, setErrors] = useState<Array<String>>([]);

  const params = useParams<any>();

  const recentUrlShorted = localStorage.getItem("@recent-url-shorted");

  const { data: response } = useGetRequest(
    `c/${shortCode !== "" ? shortCode : params?.short_code}/clicks`
  );

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (validateUrl(inputField) === false) {
      setInputField("");
      return setErrors([...errors, ErrorsTextAlert.invalidLink]);
    } else if (inputField === "") {
      return setErrors([...errors, ErrorsTextAlert.invalidLink]);
    } else if (!!response?.data === false) {
      return;
    } else if (!inputField.includes(INCLUDE_TEST)) {
      setInputField("");
      return setErrors([...errors, ErrorsTextAlert.notEncurtedLink]);
    }
    setErrors([]);
    setShortCode(findTheShortCodeInAUrl(inputField));
  }

  const clickedAmount = response?.data?.total_clicks ?? 0;

  useEffect(() => {
    document.title = `(${clickedAmount}) Shortly`;
  }, [clickedAmount]);

  return (
    <div>
      <img
        className="shortly-logo"
        src="https://i.imgur.com/IPy0h87.png"
        title="ShortLy_logo"
        alt="ShortLy_logo"
      />
      {errors.length !== 0 && (
        <Alert isError content={`${errors[errors.length - 1]}`} />
      )}

      <div className="container" style={{ height: 32 }}></div>
      <div className="container margin-local mt-5">
        <div className="style_card_apresentacao padding" style={{wordWrap: "break-word"}}>
          <h3 id="text-info" className="text-center size-font">
            Contador de Cliques da URL:{" "}
            <a
              style={{ color: "#24d3ee" }}
              href={recentUrlShorted ?? ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              {errors.length === 0
                ? inputField ?? recentUrlShorted
                : recentUrlShorted}
            </a>{" "}
          </h3>
          <h2 id="text-info-2" className="text-center style-number-count">
            {!inputField && !recentUrlShorted && errors.length !== 0
              ? 0
              : clickedAmount}
          </h2>
          <form onSubmit={handleSubmit}>
            <div id="input-container" className="input-group">
              <input
                id="input-url"
                type="text"
                className="form-control"
                placeholder="Digite aqui para ver outra URL encurtada"
                aria-label="Digite aqui para ver outra URL encurtada"
                aria-describedby="button-addon2"
                value={inputField}
                onChange={(event) => setInputField(event.target.value)}
              ></input>
              <div className="input-group-append">
                <button id="button-flex" type="submit" className="btn btn-primary button-url top-margin">
                  Contar Cliques
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />       
    </div>
  );
}
