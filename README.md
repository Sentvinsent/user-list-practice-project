# User list

Live: https://sentvinsent.github.io/user-list-practice-project/

This project is a practice application built with React that allows users to add, edit, delete, and view a list of users. It includes the following features:

Client-side Input Validation:

- The form performs client-side input validation and displays appropriate error messages upon submission.
- The list performs displays proper content or error message upon loading, adding, editing or deleting data.

State Management:

- The global state is managed using Redux Toolkit for practice purposes as it can be an overkill for smaller projects as the current one is.
- The global state is updated based on the submission status to a database, depending on the execution of async thunks.
- The useState hook is used for smaller local states.

Database Connection:

- Utilizes Wix REST API for database connection.
- HTTP requests are handled using the fetch API.

Styling:

- Elements are rendered conditionally based on relevant state.
- Uses 3rd party library for icons.
- React Transition Group used to perform entrance and exit animations.
- Styles are distributed per component utilizing CSS3 and CSS Modules.

Performance Optimizations:

- Includes various hooks for performance optimizations, such as useCallback.

## Running the Project Locally

To run this project locally:

1. **Create a Wix Headless project (or use existing site)**:
   https://dev.wix.com/docs/go-headless/getting-started/setup/general-setup/create-a-project

2. **Create `Users` database (collection)**:
   https://support.wix.com/en/article/cms-formerly-content-manager-creating-a-collection

The database must contain text field `userName` and number field `userAge`.

3. **Get your API keys**:
   https://dev.wix.com/docs/rest/articles/getting-started/api-keys

4. **Clone the repository**:

   ```bash
   git clone https://github.com/Sentvinsent/user-app-exercise
   cd user-app-exercise
   ```

5. **Install dependencies**:

   ```bash
   npm install
   ```

6. **Create a `.env` file** in the root directory and add the required environment variables as shown below:

```bash
REACT_APP_API_KEY=your_api_key
REACT_APP_MSID=your_MSID
```

Make sure to replace `your_api_key`, and `your_MSID` with the actual values from step 3.

4. **Run the project**:
   ```bash
   npm start
   ```
