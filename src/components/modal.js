import React, {Fragment, useState} from 'react'

import {XCircle} from 'react-feather'

const Modal = () => {
	const submit = (form) => {

	  return true;
	}
	return (
		<div className="overlay" id="modal">
			<div className="modal">
				<a className="close btn" href="#">{<XCircle/>}<span>Close</span></a>
				<form method="post" encType="multipart/form-data" id="gform_4" action="https://wptoolkit.techtrails.org.au/?gf_page=preview&amp;id=4" onSubmit="() => {if (submitCheck(this)){this.submit();} else {return false;}}">
					<h3>Techtrails</h3>
					<span class="description">We would like to find out a little about who is using the Techtrails Toolkit. If you don’t mind please complete the short form below. If you don’t want to submit any details, simply click on the “I’ve already submitted my details” at the bottom of the survey. </span>

					<label class="gfield_label">Are you a<span class="gfield_required">*</span></label>
						<input name="input_3" type="radio" value="student" id="choice_4_3_0" tabindex="1"/>
						<label for="choice_4_3_0" id="label_4_3_0">Student</label>
						<input name="input_3" type="radio" value="teacher" id="choice_4_3_1" tabindex="2"/>
						<label for="choice_4_3_1" id="label_4_3_1">Teacher</label>
						<input name="input_3" type="radio" value="parent" id="choice_4_3_2" tabindex="3"/>
						<label for="choice_4_3_2" id="label_4_3_2">Parent</label>
  
					<label class="gfield_label">Gender<span class="gfield_required">*</span></label>
						<input name="input_2" type="radio" value="female" id="choice_4_2_0" tabindex="4"/>
						<label for="choice_4_2_0" id="label_4_2_0">Female</label>
						<input name="input_2" type="radio" value="male" id="choice_4_2_1" tabindex="5"/>
						<label for="choice_4_2_1" id="label_4_2_1">Male</label>
						<input name="input_2" type="radio" value="other" id="choice_4_2_2" tabindex="6"/>
						<label for="choice_4_2_2" id="label_4_2_2">Other</label>

					<label class="gfield_label" for="input_4_4">Postcode<span class="gfield_required">*</span></label>
						<input name="input_4" id="input_4_4" type="text"/>


					<label class="gfield_label gfield_label_before_complex" for="input_4_5_6">Country</label>
						<input type="hidden" class="gform_hidden" name="input_5.4" id="input_4_5_4" value=""/>
					
					<label for="input_4_5_6" id="input_4_5_6_label">Country</label>
					<select name="input_5.6" id="input_4_5_6" tabindex="11">
						<option value=""></option>
						<option value="Afghanistan">Afghanistan</option>
						<option value="Albania">Albania</option>
						<option value="Algeria">Algeria</option>
						<option value="American Samoa">American Samoa</option>
						<option value="Andorra">Andorra</option>
						<option value="Angola">Angola</option>
						<option value="Antigua and Barbuda">Antigua and Barbuda</option>
						<option value="Argentina">Argentina</option>
						<option value="Armenia">Armenia</option>
						<option value="Australia" selected="selected">Australia</option>
						<option value="Austria">Austria</option>
						<option value="Azerbaijan">Azerbaijan</option>
						<option value="Bahamas">Bahamas</option>
						<option value="Bahrain">Bahrain</option>
						<option value="Bangladesh">Bangladesh</option>
						<option value="Barbados">Barbados</option>
						<option value="Belarus">Belarus</option>
						<option value="Belgium">Belgium</option>
						<option value="Belize">Belize</option>
						<option value="Benin">Benin</option>
						<option value="Bermuda">Bermuda</option>
						<option value="Bhutan">Bhutan</option>
						<option value="Bolivia">Bolivia</option>
						<option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
						<option value="Botswana">Botswana</option>
						<option value="Brazil">Brazil</option>
						<option value="Brunei">Brunei</option>
						<option value="Bulgaria">Bulgaria</option>
						<option value="Burkina Faso">Burkina Faso</option>
						<option value="Burundi">Burundi</option>
						<option value="Cambodia">Cambodia</option>
						<option value="Cameroon">Cameroon</option>
						<option value="Canada">Canada</option>
						<option value="Cape Verde">Cape Verde</option>
						<option value="Cayman Islands">Cayman Islands</option>
						<option value="Central African Republic">Central African Republic</option>
						<option value="Chad">Chad</option>
						<option value="Chile">Chile</option>
						<option value="China">China</option>
						<option value="Colombia">Colombia</option>
						<option value="Comoros">Comoros</option>
						<option value="Congo, Democratic Republic of the">Congo, Democratic Republic of the</option>
						<option value="Congo, Republic of the">Congo, Republic of the</option>
						<option value="Costa Rica">Costa Rica</option>
						<option value="Côte d'Ivoire">Côte d'Ivoire</option>
						<option value="Croatia">Croatia</option>
						<option value="Cuba">Cuba</option>
						<option value="Curaçao">Curaçao</option>
						<option value="Cyprus">Cyprus</option>
						<option value="Czech Republic">Czech Republic</option>
						<option value="Denmark">Denmark</option>
						<option value="Djibouti">Djibouti</option>
						<option value="Dominica">Dominica</option>
						<option value="Dominican Republic">Dominican Republic</option>
						<option value="East Timor">East Timor</option>
						<option value="Ecuador">Ecuador</option>
						<option value="Egypt">Egypt</option>
						<option value="El Salvador">El Salvador</option>
						<option value="Equatorial Guinea">Equatorial Guinea</option>
						<option value="Eritrea">Eritrea</option>
						<option value="Estonia">Estonia</option>
						<option value="Ethiopia">Ethiopia</option>
						<option value="Faroe Islands">Faroe Islands</option>
						<option value="Fiji">Fiji</option>
						<option value="Finland">Finland</option>
						<option value="France">France</option>
						<option value="French Polynesia">French Polynesia</option>
						<option value="Gabon">Gabon</option>
						<option value="Gambia">Gambia</option>
						<option value="Georgia">Georgia</option>
						<option value="Germany">Germany</option>
						<option value="Ghana">Ghana</option>
						<option value="Greece">Greece</option>
						<option value="Greenland">Greenland</option>
						<option value="Grenada">Grenada</option>
						<option value="Guam">Guam</option>
						<option value="Guatemala">Guatemala</option>
						<option value="Guinea">Guinea</option>
						<option value="Guinea-Bissau">Guinea-Bissau</option>
						<option value="Guyana">Guyana</option>
						<option value="Haiti">Haiti</option>
						<option value="Honduras">Honduras</option>
						<option value="Hong Kong">Hong Kong</option>
						<option value="Hungary">Hungary</option>
						<option value="Iceland">Iceland</option>
						<option value="India">India</option>
						<option value="Indonesia">Indonesia</option>
						<option value="Iran">Iran</option>
						<option value="Iraq">Iraq</option>
						<option value="Ireland">Ireland</option>
						<option value="Israel">Israel</option>
						<option value="Italy">Italy</option>
						<option value="Jamaica">Jamaica</option>
						<option value="Japan">Japan</option>
						<option value="Jordan">Jordan</option>
						<option value="Kazakhstan">Kazakhstan</option>
						<option value="Kenya">Kenya</option>
						<option value="Kiribati">Kiribati</option>
						<option value="North Korea">North Korea</option>
						<option value="South Korea">South Korea</option>
						<option value="Kosovo">Kosovo</option>
						<option value="Kuwait">Kuwait</option>
						<option value="Kyrgyzstan">Kyrgyzstan</option>
						<option value="Laos">Laos</option>
						<option value="Latvia">Latvia</option>
						<option value="Lebanon">Lebanon</option>
						<option value="Lesotho">Lesotho</option>
						<option value="Liberia">Liberia</option>
						<option value="Libya">Libya</option>
						<option value="Liechtenstein">Liechtenstein</option>
						<option value="Lithuania">Lithuania</option>
						<option value="Luxembourg">Luxembourg</option>
						<option value="Macedonia">Macedonia</option>
						<option value="Madagascar">Madagascar</option>
						<option value="Malawi">Malawi</option>
						<option value="Malaysia">Malaysia</option>
						<option value="Maldives">Maldives</option>
						<option value="Mali">Mali</option>
						<option value="Malta">Malta</option>
						<option value="Marshall Islands">Marshall Islands</option>
						<option value="Mauritania">Mauritania</option>
						<option value="Mauritius">Mauritius</option>
						<option value="Mexico">Mexico</option>
						<option value="Micronesia">Micronesia</option>
						<option value="Moldova">Moldova</option>
						<option value="Monaco">Monaco</option>
						<option value="Mongolia">Mongolia</option>
						<option value="Montenegro">Montenegro</option>
						<option value="Morocco">Morocco</option>
						<option value="Mozambique">Mozambique</option>
						<option value="Myanmar">Myanmar</option>
						<option value="Namibia">Namibia</option>
						<option value="Nauru">Nauru</option>
						<option value="Nepal">Nepal</option>
						<option value="Netherlands">Netherlands</option>
						<option value="New Zealand">New Zealand</option>
						<option value="Nicaragua">Nicaragua</option>
						<option value="Niger">Niger</option>
						<option value="Nigeria">Nigeria</option>
						<option value="Northern Mariana Islands">Northern Mariana Islands</option>
						<option value="Norway">Norway</option>
						<option value="Oman">Oman</option>
						<option value="Pakistan">Pakistan</option>
						<option value="Palau">Palau</option>
						<option value="Palestine, State of">Palestine, State of</option>
						<option value="Panama">Panama</option>
						<option value="Papua New Guinea">Papua New Guinea</option>
						<option value="Paraguay">Paraguay</option>
						<option value="Peru">Peru</option>
						<option value="Philippines">Philippines</option>
						<option value="Poland">Poland</option>
						<option value="Portugal">Portugal</option>
						<option value="Puerto Rico">Puerto Rico</option>
						<option value="Qatar">Qatar</option>
						<option value="Romania">Romania</option>
						<option value="Russia">Russia</option>
						<option value="Rwanda">Rwanda</option>
						<option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
						<option value="Saint Lucia">Saint Lucia</option>
						<option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
						<option value="Samoa">Samoa</option>
						<option value="San Marino">San Marino</option>
						<option value="Sao Tome and Principe">Sao Tome and Principe</option>
						<option value="Saudi Arabia">Saudi Arabia</option>
						<option value="Senegal">Senegal</option>
						<option value="Serbia">Serbia</option>
						<option value="Seychelles">Seychelles</option>
						<option value="Sierra Leone">Sierra Leone</option>
						<option value="Singapore">Singapore</option>
						<option value="Sint Maarten">Sint Maarten</option>
						<option value="Slovakia">Slovakia</option>
						<option value="Slovenia">Slovenia</option>
						<option value="Solomon Islands">Solomon Islands</option>
						<option value="Somalia">Somalia</option>
						<option value="South Africa">South Africa</option>
						<option value="Spain">Spain</option>
						<option value="Sri Lanka">Sri Lanka</option>
						<option value="Sudan">Sudan</option>
						<option value="Sudan, South">Sudan, South</option>
						<option value="Suriname">Suriname</option>
						<option value="Swaziland">Swaziland</option>
						<option value="Sweden">Sweden</option>
						<option value="Switzerland">Switzerland</option>
						<option value="Syria">Syria</option>
						<option value="Taiwan">Taiwan</option>
						<option value="Tajikistan">Tajikistan</option>
						<option value="Tanzania">Tanzania</option>
						<option value="Thailand">Thailand</option>
						<option value="Togo">Togo</option>
						<option value="Tonga">Tonga</option>
						<option value="Trinidad and Tobago">Trinidad and Tobago</option>
						<option value="Tunisia">Tunisia</option>
						<option value="Turkey">Turkey</option>
						<option value="Turkmenistan">Turkmenistan</option>
						<option value="Tuvalu">Tuvalu</option>
						<option value="Uganda">Uganda</option>
						<option value="Ukraine">Ukraine</option>
						<option value="United Arab Emirates">United Arab Emirates</option>
						<option value="United Kingdom">United Kingdom</option>
						<option value="United States">United States</option>
						<option value="Uruguay">Uruguay</option>
						<option value="Uzbekistan">Uzbekistan</option>
						<option value="Vanuatu">Vanuatu</option>
						<option value="Vatican City">Vatican City</option>
						<option value="Venezuela">Venezuela</option>
						<option value="Vietnam">Vietnam</option>
						<option value="Virgin Islands, British">Virgin Islands, British</option>
						<option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
						<option value="Yemen">Yemen</option>
						<option value="Zambia">Zambia</option>
						<option value="Zimbabwe">Zimbabwe</option>
					</select>
										
					<input 
						type="submit" 
						id="gform_submit_button_4" 
						class="gform_button button" 
						value="Submit" 
						tabindex="12" 
						onclick="if(window[&quot;gf_submitting_4&quot;]){return false;}  window[&quot;gf_submitting_4&quot;]=true;  " 
						onkeypress="if( event.keyCode == 13 ){ if(window[&quot;gf_submitting_4&quot;]){return false;} window[&quot;gf_submitting_4&quot;]=true;  jQuery(&quot;#gform_4&quot;).trigger(&quot;submit&quot;,[true]); }" 
					/>
		
					<input type="hidden" class="gform_hidden" name="is_submit_4" value="1"/>
					<input type="hidden" class="gform_hidden" name="gform_submit" value="4"/>

					<input type="hidden" class="gform_hidden" name="gform_unique_id" value=""/>
					<input type="hidden" class="gform_hidden" name="state_4" value="WyJbXSIsIjIzNDIyZjNlZjRlNDQwYTFjZTgwM2NjZDI1ZTE2Mjg2Il0="/>
					<input type="hidden" class="gform_hidden" name="gform_target_page_number_4" id="gform_target_page_number_4" value="0"/>
					<input type="hidden" class="gform_hidden" name="gform_source_page_number_4" id="gform_source_page_number_4" value="1"/>
					<input type="hidden" name="gform_field_values" value=""/>

				</form>
			</div>
		</div>
	)}

export default Modal