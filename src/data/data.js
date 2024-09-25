const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  "wix-site-id": process.env.REACT_APP_MSID,
};

const dataRequest = async (data, action) => {
  if (action === "FETCH") {
    try {
      const response = await fetch(data.url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data.body),
      });

      if (!response.ok) {
        throw new Error(`Fetching data failed. Status: ${response.status}`);
      }

      const responseData = await response.json();
      const mappedData = responseData.dataItems.map((item) => {
        const newItem = {
          id: item.data._id,
          userName: item.data.userName,
          userAge: item.data.userAge,
        };
        return newItem;
      });

      return mappedData;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  if (action === "ADD") {
    try {
      const response = await fetch(data.url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data.body),
      });

      if (!response.ok) {
        throw new Error(
          `Error insterting user into database. Status: ${response.status}`
        );
      }

      const responseData = await response.json();
      const mappedData = {
        id: responseData.dataItem.data._id,
        userName: responseData.dataItem.data.userName,
        userAge: responseData.dataItem.data.userAge,
      };

      return mappedData;
    } catch (error) {
      throw new Error("Failed to insert into database. Try again later.");
    }
  }
  if (action === "UPDATE") {
    try {
      const response = await fetch(data.url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data.body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      const updatedData = {
        id: responseData.dataItem.data._id,
        newUser: {
          id: responseData.dataItem.data._id,
          userName: responseData.dataItem.data.userName,
          userAge: responseData.dataItem.data.userAge,
        },
      };
      return updatedData;
    } catch (error) {
      throw new Error("Failed to update database. Try again later.");
    }
  }
  if (action === "DELETE") {
    try {
      const response = await fetch(data.url, {
        method: "DELETE",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(
          `Roor deleting from a database. Status: ${response.status}`
        );
      }

      const responseData = await response.json();
      const id = responseData.dataItem.data._id;
      return id;
    } catch (error) {
      throw new Error("Failed to delete from database. Try again later.");
    }
  }
};

export default dataRequest;
