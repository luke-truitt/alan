import mixpanel from "mixpanel-browser";

mixpanel.init("69335efda295002e506ce08b95857c5e");

// let env_check = process.env.NODE_ENV === 'production';
let env_check = true;
let actions = {
  identify: (id) => {
    if (env_check) mixpanel.identify(id);
  },
  alias: (id) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (env_check) mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      if (env_check) mixpanel.people.set(props);
    },
    set_once: (props) => {
      if (env_check) mixpanel.people.set_once(props);
    },
  },
};

export let Mixpanel = actions;
