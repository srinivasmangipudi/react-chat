'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Text,
  TextInput,
  ScrollView,
  View
} = React;

var App = React.createClass({
  getInitialState: function() {
    return {
      messages: []
    }
  },
  handleSubmit: function(event) {
    console.log('Sending: ' + event.nativeEvent.text);
    this.ws.send(event.nativeEvent.text);
    this.refs.textInput.setNativeProps({text: ''});
  },
  render: function() {
    return (
      <View style={{paddingTop: 20}}>
        <TextInput
          ref='textInput'
          autoCapitalize='none'
          autoCorrect={ false }
          placeholder='Enter a chat message...'
          returnKeyType='send'
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            margin: 10,
            padding: 5
          }}
          onSubmitEditing={this.handleSubmit.bind(this)}
        />
        <ScrollView style={{height: 400}}>
          {
            this.state.messages.map(m => {
              return <Text style={{margin: 10}}>{m}</Text>
            })
          }
        </ScrollView>
      </View>
    );
  },
  componentDidMount: function() {
    console.log('Connecting...');
    this.ws = new WebSocket('wss://siphon-chat.herokuapp.com');
    this.ws.onmessage = function(event) {
      if (event.data != 'ping') {
        this.setState({
          messages: [event.data].concat(this.state.messages)
        });
      }
    }.bind(this);
    this.ws.onerror = function() {
      console.log('WebSocket error: ', arguments);
    };
  },
  componentWillUnmount: function() {
    this.ws.close();
  },
});

AppRegistry.registerComponent('App', () => App);

/*
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image
} = React;

var Icon = require('react-native-vector-icons/MaterialIcons');
var CardView = require('./components/CardView');
var AnimatedProgressView = require('./components/AnimatedProgressView');


var TemplateApp = React.createClass({
  render: function() {
    return (
      <CardView title="chatbe">
        <Text style={styles.welcome}>
          It worked! This is a template React Native app to get you started.
          {'\n\n'}Try editing <Text style={{fontWeight: 'bold'}}>
          chatbe/index.js</Text> in your app directory and pushing
          the changes.
        </Text>
        <Text style={styles.icons}>
          <Icon name="alarm" size={36} />
          <Icon name="backup" size={36} />
          <Icon name="done" size={36} />
          <Icon name="home" size={36} />
          <Icon name="face" size={36} />
          <Icon name="flight-takeoff" size={36} />
          <Icon name="grade" size={36} />
          <Icon name="room" size={36} />
        </Text>
        <AnimatedProgressView />
        <Image
          style={{height: 180}}
          resizeMode={Image.resizeMode.cover}
          source={require('./landscape.png')}
        />
      </CardView>
    );
  }
});

var styles = StyleSheet.create({
  welcome: {
    fontSize: 17,
    color: '#636363',
    margin: 10
  },
  icons: {
    letterSpacing: 15,
    color: '#999898',
    margin: 10
  }
});

AppRegistry.registerComponent('App', () => TemplateApp);

*/
