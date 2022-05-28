<script lang="ts">
  import Home from './Home.svelte'
  import { faHome, faClock } from "@fortawesome/free-solid-svg-icons";
  import { TabView, TabList, TabPanel, Tab } from "./lib/tabs.ts";

  import "./App.css";
  import Session from "./Session.svelte";
</script>

<main>
  <TabView>
    <TabList>
      <Tab name="Home" icon={faHome} />
      <Tab name="Session" icon={faClock} />
    </TabList>

    <TabPanel>
      <Home/>
    </TabPanel>

    <TabPanel>
       <Session/>
    </TabPanel>
  </TabView>
</main>
