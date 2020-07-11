const faunadb = require("faunadb")
const q = faunadb.query

// const client = new faunadb.Client({ secret: process.env.FAUNA })
const client = new faunadb.Client({
  secret: "fnADwIN_lzACDEFFBQCHoYk831PcLoiAK-6XArkF",
})

const run = async () => {
  // UPDATE COMPLETED STATUS
  // const results = await client.query(
  //   q.Update(q.Ref(q.Collection("todos"), "270361520586621453"), {
  //     data: {
  //       completed: true,
  //     },
  //   })
  // )
  // console.log(results)
  // ADD A NEW TODO
  // const results = await client.query(
  //   q.Create(q.Collection("todos"), {
  //     data: {
  //       body: "test body",
  //       completed: false,
  //       owner: "user-test-2",
  //     },
  //   })
  // )
  // console.log(results.ref.id)
  const results = await client.query(
    q.Paginate(q.Match(q.Index("todos_by_user"), "user-test"))
  )
  console.log(results)
}

run()
