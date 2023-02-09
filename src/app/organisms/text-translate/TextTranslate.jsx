import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './TextTranslate.scss';
import { generateRequestUrl, normaliseResponse } from 'google-translate-api-browser';
import settings from '../../../client/state/settings';

import cons from '../../../client/state/cons';
import navigation from '../../../client/state/navigation';

import IconButton from '../../atoms/button/IconButton';
import { MenuHeader } from '../../atoms/context-menu/ContextMenu';
import ScrollView from '../../atoms/scroll/ScrollView';
import PopupWindow from '../../molecules/popup-window/PopupWindow';

import CrossIC from '../../../../public/res/ic/outlined/cross.svg';

function BeforeTextTranslateBlock({ title, json }) {
  return (
    <div className="view-source__card">
      <MenuHeader>{title}</MenuHeader>
      <ScrollView horizontal vertical={false} autoHide>
        <pre className="text text-b1">
          <code className="language-json">{json}</code>
        </pre>
      </ScrollView>
    </div>
  );
}
BeforeTextTranslateBlock.propTypes = {
  title: PropTypes.string.isRequired,
  json: PropTypes.shape({}).isRequired,
};

function AfterTextTranslateBlock({ title, json }) {
  return (
    <div className="view-source__card">
      <MenuHeader>{title}</MenuHeader>
      <ScrollView horizontal vertical={false} autoHide>
        <pre className="text text-b1">
          <code className="language-json" id="translatedText">
            {json}
          </code>
        </pre>
      </ScrollView>
    </div>
  );
}
AfterTextTranslateBlock.propTypes = {
  title: PropTypes.string.isRequired,
  json: PropTypes.shape({}).isRequired,
};

function TextTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const loadTextTranslate = (e) => {
      setEvent(e);
      setIsOpen(true);
    };
    navigation.on(cons.events.navigation.TEXTTRANSLATE_OPENED, loadTextTranslate);
    return () => {
      navigation.removeListener(cons.events.navigation.TEXTTRANSLATE_OPENED, loadTextTranslate);
    };
  }, []);

  const handleAfterClose = () => {
    setEvent(null);
  };

  async function translate(translateUrl) {
    const response = await fetch(`${translateUrl}`);

    if (!response.ok) {
      throw new Error('Request failed');
    }

    const body = await response.json();

    if(settings.getTranslationAPIIndex() === 1){

      let result = "";

      for (let i = 0; i < body.translations.length; i += 1) {
        result += body.translations[i].text;
      }

      
      if(result === undefined){
        result = body.message;
      }
      return result;
    }

    return normaliseResponse(body, settings.getTranslationLanguage());
  }

  const translateText = (text) => {

    const origin = text.replace(/> <.*> .*\n/gms, "").trim();

    let url = generateRequestUrl(origin, { to: settings.getTranslationLanguage() }).replace(
      'https://translate.google.com/',
      'https://panel.icarus.today/'
    );

    if(settings.getTranslationAPIIndex() === 1) {
      url = `https://rwwhwqaduuvdbswpmq6p.icarus.today/&text=${origin}&target_lang=${settings.getTranslationLanguage()}`;
    }

    translate(url).then((result) => {

      if(settings.getTranslationAPIIndex() === 0) document.getElementById('translatedText').innerHTML = result.text;
      else document.getElementById('translatedText').innerHTML = result;
      return "Setting Error!"
    });

    return 'Translating...';
  };

  const renderTextTranslate = () => (
    <div className="text-translate">
      <BeforeTextTranslateBlock
          title="Original text"
          json={event.getEffectiveEvent().content.body}
        />
      <AfterTextTranslateBlock
        title={settings.getTranslationAPIIndex() === 1 ? "DeepL Translated Text" : "Google Translated Text"}
        json={translateText(event.getEffectiveEvent().content.body)}
      />
    </div>
  );

  return (
    <PopupWindow
      isOpen={isOpen}
      title="Translate"
      onAfterClose={handleAfterClose}
      onRequestClose={() => setIsOpen(false)}
      contentOptions={<IconButton src={CrossIC} onClick={() => setIsOpen(false)} tooltip="Close" />}
    >
      {event ? renderTextTranslate() : <div />}
    </PopupWindow>
  );
}

export default TextTranslate;
