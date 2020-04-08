const test = require("tape");
const db = require("../database/connection");
const build = require("../database/build");
const { getTools, createTool, addLove } = require("../model");

// test getTools()
test("Can get all user entries with getTools() function", t => {
  build().then(() => {
      getTools(`%`)
      .then(entries => {
          const firstEntry = entries[0];
          t.equal(firstEntry.category, "Entertainment");
          t.end();
      })
      .catch(error => {
          t.error(error);
          t.end();
      })
  });
});

test("Can get unique IDs of each tool for use in creating cards", t => {
  build().then(() => {
    getTools(`%`)
    .then(entries => {
        const firstEntry = entries[0];
        t.equal(firstEntry.id, 1);
        t.end();
    })
    .catch(error => {
        t.error(error);
        t.end();
    })
  });
});

test("Can get filtered user entries with getTools() function (name)", t => {
  build().then(() => {
    getTools(`Work`)
    .then(entries => {
        const firstEntry = entries[0];
        t.equal(firstEntry.tool_name, "Jitsi");
        t.end();
    })
    .catch(error => {
        t.error(error);
        t.end();
    })
  });
});

test("Can get filtered user entries with getTools() function (id)", t => {
  build().then(() => {
    getTools(`News`)
      .then(entries => {
        const firstEntry = entries[0];
        t.equal(firstEntry.id, 4);
        t.end();
      })
      .catch(error => {
        t.error(error);
        t.end();
      })
  });
});

test("Does filter return all filtered tools", t => {
  build().then(() => {
    getTools(`Health`)
      .then(entries => {
        t.equal(entries.length, 2);
        t.end();
      })
      .catch(error => {
        t.error(error);
        t.end();
      })
  });
});

// test createTool
test("Can user add to the database", t => {
  build().then(() => {
    const userEntry = {
        category: "Work",
        tool_name: "Slack",
        tool_description: "Great for chatting in channels!",
        tool_link: "https://www.slack.com",
        added_by: "slackfiend"
    };
    createTool (userEntry)
    .then (getTools(`%`)
    .then (entries => {
      const latestEntry = entries[entries.length-1];
      t.equal(latestEntry.tool_name, "Slack");
      t.end();
    })
    .catch (error => {
      t.error(error);
      t.end();
    }))
  })
})


// test addLove
test("Can add love to specific tool", t => {
  build().then(() => {
    addLove(5)
    .then(() =>
      getTools(`%`)
      .then(entries => {
        const newMiroLove = entries.find(entry => entry.id == 5).love;
        t.equal(newMiroLove, 14, `for ${entries[4].tool_name}`);
        t.end();
      })
      .catch(error => {
        t.error(error);
        t.end();
      }));
  });
});


test("Can increase tool love by one", t => {
  let currentLove;
  build().then(() => {
    getTools(`%`)
    .then(entries => {
      currentLove = entries.find(entry => entry.id == 4).love;
    })
    .catch(error => {
      console.error(error);
    })
    addLove(4)
    .then(() =>
      getTools(`%`)
      .then(entries => {
        const newLove = entries.find(entry => entry.id == 4).love;
        t.equal(newLove, currentLove + 1, `was ${currentLove} now ${newLove}`);
        t.end();
      })
      .catch(error => {
        t.error(error);
        t.end();
      }));
  });
});