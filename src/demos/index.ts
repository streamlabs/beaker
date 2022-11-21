const demos = import.meta.glob('../demos/*.vue');

const components = Object.keys(demos).map(key => {
  const componentName = key.slice(2, -4);
  const label = componentName.split(/(?=[A-Z])/).join(" ");
  const name = label.replace(/ /g, "-").toLowerCase();
  const component = demos[key];

  return {
    component,
    name,
    componentName,
    label
  };
});

export default components;