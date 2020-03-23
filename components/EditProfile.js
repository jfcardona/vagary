import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Inputstyle from './Inputstyle';

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      nickname: "",
      abouty: "",
      photoUrl: this.props.photoUrl,
      maxDate: new Date().getDate(),
      date: new Date().getDate(),
      countryList: [],
    };

    this.onCountryChange = this.onCountryChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
  }

  onCountryChange(country) {
    this.setState({ country });
  }

  onCityChange(city) {
    this.setState({ city });
  }

  componentDidMount() {
    let initialPlanets = [];
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => {
        return response.json();
      })
      .then(data => {
        for (let i = 0; i < 250; i++) {
          var joined = { value: data[i].name };
          initialPlanets.push(joined);
        }

        this.setState({
          countryList: initialPlanets,
        });
      });
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ photoUrl: result.uri });
    }
  };

  render() {
    var ancho = Dimensions.get('window').width;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          width: ancho,
          alignItems: 'center',
        }}>
        <View style={styles.container}>
          <View style={{ height: '25%' }}>
            <TouchableOpacity onPress={this._pickImage}>
              <Image
                source={{ uri: this.state.photoUrl }}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View style={{ height: '70%', width: ancho, alignItems: 'center' }}>
            <Inputstyle
            isBig = {false}
              onChangeText={name => this.setState({ name })}
              label="Nombre completo"
              value={this.state.name}
            />
            <Inputstyle
             isBig = {false}
              onChangeText={nickname => this.setState({ nickname })}
              label="Nickname"
              value={this.state.nickname}
            />
             <Inputstyle
              isBig = {true}
              onChangeText={abouty => this.setState({ abouty })}
              label="Acerca de tí"
              value={this.state.abouty}
             
            />
            <Text style={{ fontWeight: 'bold'}}>Fecha de nacimiento</Text>
            <DatePicker
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="01-01-1950"
              maxDate={this.state.maxDate}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={date => {
                this.setState({ date: date });
              }}
              style={{ marginTop: 10, width: '80%' }}
            />
            <View style={{ margin: 10, width: '80%' }}>
              <Dropdown
                label="Selecciona tu país"
                onChangeText={this.onChangeText}
                data={this.state.countryList}
              />
            </View>
            <View
              style={{ margin: 10, width: '80%', justifyContent: 'center' }}>
              <Button title="Press me" onPress={() => alert(this.state.name)} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 20,
    flexDirection: 'column',
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 3,
    borderRadius: 150,
  },
});
