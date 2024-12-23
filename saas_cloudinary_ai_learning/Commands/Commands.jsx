// _______________________________   Clerk NextJS   ______________________________________________________________
//                                                                                                                |  
// Clerk NextJS  -->>  For Authentication Dashboard                                                               |
    //  npm install @clerk/nextjs                                                                                 |
    // npm i @clerk/themes    -->> Clerk themes for Dark Mode (Make Appreance -> Dark in ClerkContextProvider)    |
// _______________________________________________________________________________________________________________|


// _______________________________   PRISMA   ______________________________________________________________
//                                                                                                          |
//       PRISMA   -->>  For Database Connection                                                             |
// npm i -D prisma                                                                                          |
// npm i @prisma/client                                                                                     |
// npx prisma init                                                                                          |
// npx prisma db pull       // X //    -->> If DB and tables are created in MySQL serverWorkbench.          |
//                                  -->> It turn your database schema into a Prisma schema                  |
//          ----   To push new schema  ------                                                               |
// npx prisma generate                                                                                      |
// npx prisma db push                                                                                       |
// npx prisma studio          -->> *** To host DB to the WebServer                                          |
// npx prisma migrate reset       -->> Reset all existing data from db                                      |
// _________________________________________________________________________________________________________|


// ____________________________________________________________________________________________
// _________________    Command in Command Prompt to KILL BUSY PORTS   _____________________|_|
//                                                                                          | |
// C:\Users\Ujjawal Singh>netstat -ano | findstr :3000                                      | |
//   TCP    0.0.0.0:3000           0.0.0.0:0              LISTENING       16704             | |
//   TCP    [::]:3000              [::]:0                 LISTENING       16704             | |
//                                                                                          | |
// C:\Users\Ujjawal Singh>taskkill /PID 16704 /F                                            | |
// _________________________________________________________________________________________| |
// _________________________________________________________________________________________|_|

// _____________________   NGROK   ___________________________________________
// ngrok  -->> Ngrok is a tool that creates secure tunnels to localhost,      |
//                     allowing you to expose local servers to the internet.  |
//                                                                            |
    // ngrok http --domain=promoted-fish-working.ngrok-free.app 3000          |
// ___________________________________________________________________________|


// npm i -D daisyui@latest