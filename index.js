import {ApolloServer,gql} from "apollo-server";

const users=[
    {
        id:1,
        username:'kong',
        email:'rhdxoals@gmail.com'
    },
    {
        id:2,
        username:'ha',
        email:'ha@gmail.com'
    }
]
const posts = [
    {
        id:1,
        content:'first post!',
        userId:1

    },
    {
        id:2,
        content:'second post!',
        userId:2
    }
]

const typeDefs = gql`
    
    type User{
        id:ID!
        """
        유저의 이름
        """
        username:String!
        """
        유저의 이메일
        """
        email:String!
        """
        유저의 직업
        """
        job:String!
    }
    
    type Post{
        id:ID!
        content:String!
        author:User!
    }
    
    type Query {
        """
        모든 포스팅을 가져옵니다
        """
        allPosts:[Post!]!
        """
        모든 유저를 가져옵니다
        """
        allUsers:[User!]!
        """
        특정 포스팅을 가져옵니다
        """
        post(id:ID!):Post
        """
        특정 유저를 가져옵니다
        """
        user(id:ID!):User
    }
    
    type Mutation{
        createPost(content:String!,userId:ID!):Post!
        deletePost(id:ID!):Boolean!
    }
`;

const resolvers = {
    Query:{
        allPosts(){
            return posts;
        },
        post(root,args){
            return posts.find(post => post.id === Number(args.id));
        },
        allUsers(){
            return users;
        }
    },
    Mutation:{
        createPost(_,{content, userId}){
            const newPost = {
                id:posts.length+1,
                content,
                userId
            }
            posts.push(newPost);
            return newPost;
        }
    },
    User:{
        job(root){
            const name = root.username;
            return `${name}'s job!`;
        }
    },
    Post:{
        author(root){
            console.log(root)
            const user = users.find(u=> u.id === Number(root.userId));
            return user;
        }
    }
}

const server = new ApolloServer({
    typeDefs,resolvers
})

server.listen().then(({url})=>{
    console.log(`server ready at ${url}`)
})