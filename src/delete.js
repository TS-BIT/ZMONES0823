
app.get("/zmogus/:id/delete", async (req, res) => {
    try {
      let zmones = await readFile(DATA_FILE, {
        encoding: "utf-8",
      });
      zmones = JSON.parse(zmones);
  
      const id = parseInt(req.params.id);
  
      const index = zmones.findIndex((z) => z.id === id);
  
      if (index >= 0) {
        zmones.splice(index, 1);
        await writeFile(DATA_FILE, JSON.stringify(zmones, null, 2), {
          encoding: "utf-8",
        });
      }
  
      res.redirect("/");
    } catch (err) {
      res.status(500).end(
        `<html><body>Ivyko klaida: ${err.message}</body></html>`,
      );
    }
  });
  
  app.get("/json/zmogus", async (req, res) => {
    try {
      let zmones = await readFile(DATA_FILE, {
        encoding: "utf-8",
      });
      zmones = JSON.parse(zmones);
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(zmones));
      
    } catch (err) {
      res.status(500).end(
        `<html><body>Ivyko klaida: ${err.message}</body></html>`,
      );
    }
  });
  
  app.delete("/json/zmogus/:id", async (req, res) => {
    try {
      let zmones = await readFile(DATA_FILE, {
        encoding: "utf-8",
      });
      zmones = JSON.parse(zmones);
  
      const id = parseInt(req.params.id);
      const index = zmones.findIndex((z) => z.id === id);
      if (index >= 0) {
        zmones.splice(index, 1);
        await writeFile(DATA_FILE, JSON.stringify(zmones, null, 2), {
          encoding: "utf-8",
        });
      }
      res.status(200).end();
    } catch (err) {
      res.status(500).end(
        `<html><body>Ivyko klaida: ${err.message}</body></html>`,
      );
    }
  });