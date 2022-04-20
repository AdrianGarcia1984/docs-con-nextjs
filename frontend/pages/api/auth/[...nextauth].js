import axios from "axios";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import CustomProviders from "next-auth/providers/oauth"
import Swal from "sweetalert2";
import { useUser } from '../../../src/context/userContext';




export default NextAuth({
  // Configure one or more authentication providers
  // providers: [
  //   GithubProvider({
  //     clientId: process.env.GITHUB_ID,
  //     clientSecret: process.env.GITHUB_SECRET,
  //   }),

  //   EmailProvider({
  //       clientId: process.env.GITHUB_ID,
  //       clientSecret: process.env.GITHUB_SECRET,
  //     }),
  //   // ...add more providers here
  // ],
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Rnoroeste ACCOUNT',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        identificacion: { label: "identificacion", type: "number", placeholder: "" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials, req) {
        const { data } = await axios.post("api/usuario/login", credentials);
        console.log('respuesta del server ', data)
        const user = data
        // If no error and we have user data, return it
        if (data.ok) {
          //return data
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        console.log('user1', user)
        console.log('token1', token)
        token.id = user._id
        token.accessToken=user.token
        console.log('token1', token)
      }
      return token
    },
    async session({ session, token, user }) {
      console.log('token2', token)
      console.log('user2', user)
      if (token) {
        //session.id = token.id
        cookie.set()
        session.accessToken = token.accessToken
        console.log('session2', session)
      }
      return session
    },

  },

})


