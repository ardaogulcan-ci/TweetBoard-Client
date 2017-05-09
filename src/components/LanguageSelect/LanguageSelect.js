import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class LanguageSelect extends Component {
  render() {
    return (
      <SelectField
        hintText="Select lanuage of the tweets"
        floatingLabelText="Tweet language"
        floatingLabelFixed={true}
        value={this.props.value || 'all'}
        onChange={this.props.onChange}>
        <MenuItem value="all" primaryText="All"/>
        <MenuItem disabled={true} primaryText="---" />
        <MenuItem value="en" primaryText="English (English)" />
        <MenuItem value="tr" primaryText="Turkish (Türkçe)" />
        <MenuItem disabled={true} primaryText="---" />
        <MenuItem value="am" primaryText="Amharic (አማርኛ)" />
        <MenuItem value="ar" primaryText="Arabic (العربية)" />
        <MenuItem value="hy" primaryText="Armenian (հայերեն)" />
        <MenuItem value="bn" primaryText="Bengali (বাংলা)" />
        <MenuItem value="bg" primaryText="Bulgarian (български)" />
        <MenuItem value="my" primaryText="Burmese (ဗမာ)" />
        <MenuItem value="ckb" primaryText="Central Kurdish (کوردیی ناوەندی)" />
        <MenuItem value="zh" primaryText="Chinese (中文)" />
        <MenuItem value="da" primaryText="Danish (dansk)" />
        <MenuItem value="dv" primaryText="Divehi (Divehi)" />
        <MenuItem value="nl" primaryText="Dutch (Nederlands)" />
        <MenuItem value="et" primaryText="Estonian (eesti)" />
        <MenuItem value="fi" primaryText="Finnish (suomi)" />
        <MenuItem value="fr" primaryText="French (français)" />
        <MenuItem value="ka" primaryText="Georgian (ქართული)" />
        <MenuItem value="de" primaryText="German (Deutsch)" />
        <MenuItem value="el" primaryText="Greek (Ελληνικά)" />
        <MenuItem value="gu" primaryText="Gujarati (ગુજરાતી)" />
        <MenuItem value="ht" primaryText="Haitian Creole (Haitian Creole)" />
        <MenuItem value="he" primaryText="Hebrew (עברית)" />
        <MenuItem value="hi" primaryText="Hindi (हिन्दी)" />
        <MenuItem value="hu" primaryText="Hungarian (magyar)" />
        <MenuItem value="is" primaryText="Icelandic (íslenska)" />
        <MenuItem value="id" primaryText="Indonesian (Indonesia)" />
        <MenuItem value="it" primaryText="Italian (italiano)" />
        <MenuItem value="ja" primaryText="Japanese (日本語)" />
        <MenuItem value="kn" primaryText="Kannada (ಕನ್ನಡ)" />
        <MenuItem value="km" primaryText="Khmer (ខ្មែរ)" />
        <MenuItem value="ko" primaryText="Korean (한국어)" />
        <MenuItem value="lo" primaryText="Lao (ລາວ)" />
        <MenuItem value="lv" primaryText="Latvian (latviešu)" />
        <MenuItem value="lt" primaryText="Lithuanian (lietuvių)" />
        <MenuItem value="ml" primaryText="Malayalam (മലയാളം)" />
        <MenuItem value="mr" primaryText="Marathi (मराठी)" />
        <MenuItem value="ne" primaryText="Nepali (नेपाली)" />
        <MenuItem value="no" primaryText="Norwegian (norsk)" />
        <MenuItem value="or" primaryText="Oriya (ଓଡ଼ିଆ)" />
        <MenuItem value="ps" primaryText="Pashto (پښتو)" />
        <MenuItem value="fa" primaryText="Persian (فارسی)" />
        <MenuItem value="pl" primaryText="Polish (polski)" />
        <MenuItem value="pt" primaryText="Portuguese (português)" />
        <MenuItem value="pa" primaryText="Punjabi (ਪੰਜਾਬੀ)" />
        <MenuItem value="ro" primaryText="Romanian (română)" />
        <MenuItem value="ru" primaryText="Russian (русский)" />
        <MenuItem value="sr" primaryText="Serbian (српски)" />
        <MenuItem value="sd" primaryText="Sindhi (سنڌي)" />
        <MenuItem value="si" primaryText="Sinhala (සිංහල)" />
        <MenuItem value="sl" primaryText="Slovenian (slovenščina)" />
        <MenuItem value="es" primaryText="Spanish (español)" />
        <MenuItem value="sv" primaryText="Swedish (svenska)" />
        <MenuItem value="tl" primaryText="Tagalog (Tagalog)" />
        <MenuItem value="ta" primaryText="Tamil (தமிழ்)" />
        <MenuItem value="te" primaryText="Telugu (తెలుగు)" />
        <MenuItem value="th" primaryText="Thai (ไทย)" />
        <MenuItem value="bo" primaryText="Tibetan (བོད་སྐད་)" />
        <MenuItem value="ur" primaryText="Urdu (اردو)" />
        <MenuItem value="ug" primaryText="Uyghur (ئۇيغۇرچە)" />
        <MenuItem value="vi" primaryText="Vietnamese (Tiếng Việt)" />
      </SelectField>
    );
  }
}

LanguageSelect.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default LanguageSelect;
