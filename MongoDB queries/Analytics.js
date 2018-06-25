db.getCollection("Whole_Rec").createIndex({ "Mobile":1,"BookedDate":1})

db.getCollection("Whole_Rec").createIndex({ "Mobile":1,"Abhiid":1})

db.getCollection("Whole_Rec").createIndex({ "APISource":1,"OperatorName":1,"BookedDate":1})

db.getCollection("Whole_Rec").createIndex({ "APISource":1,"OperatorName":1,"Source":1,"Destination":1,"BookedDate":1})

db.getCollection("Whole_Rec").createIndex({ "APISource":1,"Source":1,"Destination":1,"BookedDate":1})

db.getCollection("Whole_Rec").createIndex({ "Mobile":1,"OperatorName":1,"BookedDate":1})

db.getCollection("Whole_Rec").createIndex({ "Mobile":1,"OperatorName":1,"Source":1,"Destination":1,"BookedDate":1})

db.getCollection("Whole_Rec").createIndex({"OperatorName":1,"Source":1,"Destination":1, "CancellationDate":1})

db.getCollection("Whole_Rec").createIndex({ "CancellationDate":1})

db.getCollection("Whole_Rec").createIndex({ "Mobile":1,"CancellationDate":1})

db.getCollection("Whole_Rec").createIndex({"OperatorName":1, "CancellationDate":1})

db.getCollection("Whole_Rec").createIndex({ "Source":1,"Destination":1,"CancellationDate":1})

db.getCollection("Whole_Rec").createIndex({ "APISource":1,"CancellationDate":1})

db.getCollection("Whole_Rec").createIndex({ "APISource":1,"Source":1,"Destination":1,"CancellationDate":1})



db.getCollection("Whole_Rec").aggregate([
    {
      $group:{
        _id:{"Mobile":"$Mobile","BookedDate":"$BookedDate"},
        count: { $sum: 1 }
                  
      }
     
    },
     
      { $out: "Mob_Anltics"} 
  ],
  { allowDiskUse: true })
  
  
db.getCollection("Whole_Rec").aggregate([
    {
      $group:{
        _id:{"Mobile":"$Mobile","BookedDate":"$BookedDate"},
        count: { $sum: 1 },
          }
                  
      },
      { $sort: { count: 1 }
     
    }
     
     
  ],
  { allowDiskUse: true })
  
  
//Makes a collection for customer wise analytics -- with agents 
db.getCollection("Whole_Rec").aggregate([
    {
      $group:{
        _id:{"Mobile":"$Mobile","BookedDate":"$BookedDate"},
        bookings: { $sum : 1 },
        seats: {$sum : "$No_Of_Seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }},
      {$sort: {TicketAmount: -1}},
     
      { $out: "TopCustomers"} 
  ],
  { allowDiskUse: true })


db.getCollection("Whole_Rec").aggregate([
    {
      $group:{
        _id:{"Mobile":"$Mobile"},
        bookings: { $sum : 1 },
        seats: {$sum : "$No_Of_Seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }},
      {$sort: {TicketAmount: -1}},
     
      { $out: "TopCustomersWithOutDate"} 
  ],
  { allowDiskUse: true })



//For main customer wise chart same as operator wise chart on landing page of /operator-analytics url
db.getCollection("TopCustomers").aggregate([
    {
      $group:{
        _id:{"Mobile":"$_id.Mobile"},
        bookings: { $sum : "$bookings" },
        seats: {$sum : "$seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }}
      
  ],
  { allowDiskUse: true })
  
//To find records of a particular customer
db.getCollection("TopCustomers").find({ "_id.Mobile" : "9999999999"}  )

//{$count: "ResultCount"}

db.getCollection("Whole_Rec").distinct("BookingPlatform") //5

db.getCollection("Whole_Rec").distinct("APISource") //485

//To check if mobile number is of an agent's
db.getCollection("Whole_Rec").aggregate([
    {
      $match:{
        Mobile:"9999999999", Abhiid: 6}},
        {$group:{ _id: null,
        bookings: { $sum : 1 },
        seats: {$sum : "$No_Of_Seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }}
      
     
      
  ],
  { allowDiskUse: true })
  
// Mobile and Abhiid
db.getCollection("Whole_Rec").aggregate([
    {
      $group:{
        _id:{"Mobile":"$Mobile","Abhiid":"$Abhiid"},
        bookings: { $sum : 1 },
        seats: {$sum : "$No_Of_Seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }},
      {$sort: {TicketAmount: -1}},
     
      { $out: "GrpByMobAbhiid"} 
  ],
  { allowDiskUse: true })
  
  
//To remove transactions of agents to find customers
db.getCollection("Whole_Rec").aggregate([
 	{ $match: { Abhiid : {$ne: 6}}},
    {
      $group:{
        _id:{"Mobile":"$Mobile","BookedDate":"$BookedDate"},
        bookings: { $sum : 1 },
        seats: {$sum : "$No_Of_Seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }},
      {$sort: {TicketAmount: -1}},
     
      { $out: "TopCustomersWithoutAgents"} 
  ],
  { allowDiskUse: true })
  
//Customers without agents and date
db.getCollection("TopCustomersWithoutAgents").aggregate([
    {
      $group:{
        _id:{"Mobile":"$_id.Mobile"},
        bookings: { $sum : "$bookings" },
        seats: {$sum : "$seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }},
      {$sort : {TicketAmount:-1}},
      {$out: "CustomersWithoutAgentsnDate"}
      
  ],
  { allowDiskUse: true })

  
//**APISource wise analytics**//

//To make separate collection for API Wise analytics
db.getCollection("Whole_Rec").aggregate([
    {
      $group:{
        _id:{"APISource":"$APISource","BookedDate":"$BookedDate"},
        bookings: { $sum : 1 },
        seats: {$sum : "$No_Of_Seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }},
      {$sort: {TicketAmount: -1}},
     
      { $out: "TopAPISource"} 
  ],
  { allowDiskUse: true })

//For main chart 
db.getCollection("TopAPISource").aggregate([
    {
      $group:{
        _id:{"APISource":"$_id.APISource"},
        bookings: { $sum : "$bookings" },
        seats: {$sum : "$seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }}
      
  ],
  { allowDiskUse: true })
  
//For a particular APISource
db.getCollection("TopAPISource").find({ "_id.APISource" : "Bitla"}  )

//APISource & Operator//

//Separate collection for API source & Operator
db.getCollection("Whole_Rec").aggregate([
    {
      $group:{
        _id:{"APISource":"$APISource","OperatorName":"$OperatorName","BookedDate":"$BookedDate"},
        bookings: { $sum : 1 },
        seats: {$sum : "$No_Of_Seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }},
      {$sort: {TicketAmount: -1}},
     
      { $out: "TopAPIOp"} 
  ],
  { allowDiskUse: true })
  

//For main chart
db.getCollection("TopAPIOp").aggregate([
    {
      $group:{
        _id:{"APISource":"$_id.APISource","OperatorName":"$_id.OperatorName"},
        bookings: { $sum : "$bookings" },
        seats: {$sum : "$seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }}
          
  ],
  { allowDiskUse: true })
  
//Separate collection for APISource & Route
db.getCollection("Whole_Rec").aggregate([
    {
      $group:{
        _id:{"APISource":"$APISource","Source":"$Source","Destination":"$Destination","BookedDate":"$BookedDate"},
        bookings: { $sum : 1 },
        seats: {$sum : "$No_Of_Seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }},
      {$sort: {TicketAmount: -1}},
     
      { $out: "TopAPIRoute"} 
  ],
  { allowDiskUse: true })
  
//For main chart // API Source & Route
db.getCollection("TopAPIRoute").aggregate([
    {
      $group:{
        _id:{"APISource":"$_id.APISource","Souce":"$_id.Source","Destination":"$_id.Destination"},
        bookings: { $sum : "$bookings" },
        seats: {$sum : "$seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }},
      {$sort: {TicketAmount: -1}}
          
  ],
  { allowDiskUse: true })
  
//APISource Operator and route
db.getCollection("Whole_Rec").aggregate([
    {
      $group:{
        _id:{"APISource":"$APISource","OperatorName":"$OperatorName","Source":"$Source","Destination":"$Destination","BookedDate":"$BookedDate"},
        bookings: { $sum : 1 },
        seats: {$sum : "$No_Of_Seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }},
      {$sort: {TicketAmount: -1}},
     
      { $out: "APIOpSD"} 
  ],
  { allowDiskUse: true })
  
//APISource Operator and route without date- main chart
db.getCollection("APIOpSD").aggregate([
    {
      $group:{
        _id:{"APISource":"$_id.APISource","OperatorName":"$_id.OperatorName","Source":"$_id.Source","Destination":"$_id.Destination"},
        bookings: { $sum : "$bookings" },
        seats: {$sum : "$seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }},
      {$sort: {TicketAmount: -1}},
     
      { $out: "APIOpSDWithoutDate"} 
  ],
  { allowDiskUse: true })
  
  
//Top Agents with date
db.getCollection("Whole_Rec").aggregate([
 	{ $match: { Abhiid : {$eq: 6}}},
    {
      $group:{
        _id:{"Mobile":"$Mobile","BookedDate":"$BookedDate"},
        bookings: { $sum : 1 },
        seats: {$sum : "$No_Of_Seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }},
      {$sort: {TicketAmount: -1}},
     
      { $out: "TopAgents"} 
  ],
  { allowDiskUse: true })
  
//Top agents without  date
db.getCollection("TopAgents").aggregate([
 	
    {
      $group:{
        _id:{"Mobile":"$_id.Mobile"},
        bookings: { $sum : "$bookings" },
        seats: {$sum : "$seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }},
      {$sort: {TicketAmount: -1}},
     
      { $out: "TopAgentsWithoutDate"} 
  ],
  { allowDiskUse: true })
  
//Agents database -- bad idea lol
db.getCollection("Whole_Rec").aggregate([
 	{ $match: { Abhiid : {$eq: 6}}}, // Takes a loootttt of time
    
     
      { $out: "AgentsDB"} 
  ],
  { allowDiskUse: true })
  
//Agents Operator
db.getCollection("Whole_Rec").aggregate([
 	{ $match: { Abhiid : {$eq: 6}}},
    {
      $group:{
        _id:{"Mobile":"$Mobile","OperatorName":"$OperatorName","BookedDate":"$BookedDate"},
        bookings: { $sum : 1 },
        seats: {$sum : "$No_Of_Seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }},
      {$sort: {TicketAmount: -1}},
     
      { $out: "TopAgentsOp"} 
  ],
  { allowDiskUse: true })
  
//Agents Operator Source Destination
db.getCollection("Whole_Rec").aggregate([
 	{ $match: { Abhiid : {$eq: 6}}},
    {
      $group:{
        _id:{"Mobile":"$Mobile","OperatorName":"$OperatorName","Source": "$Source","Destination": "$Destination","BookedDate":"$BookedDate"},
        bookings: { $sum : 1 },
        seats: {$sum : "$No_Of_Seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }},
      {$sort: {TicketAmount: -1}},
     
      { $out: "TopAgentsOpSD"} 
  ],
  { allowDiskUse: true })


//Agents Op S D without date  
db.getCollection("TopAgentsOpSD").aggregate([

    {
      $group:{
        _id:{"Mobile":"$_id.Mobile","OperatorName":"$_id.OperatorName","Source": "$_id.Source","Destination": "$_id.Destination"},
        bookings: { $sum : "$bookings" },
        seats: {$sum : "$seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }},
      {$sort: {TicketAmount: -1}}
     
      
  ],
  { allowDiskUse: true })
  
// Cancellation pattern //

db.getCollection("Whole_Rec").aggregate([
	{$match: { $or: [{ CancellationDate: {$ne : ""} }, { CancellationAmount: {$gt: 0.0 } }] }},
    {
      $group:{
        _id: {"CancellationDate"  : "$CancellationDate"},
        
        count: { $sum : 1 },
        seats: {$sum : "$No_Of_Seats"},
        CancellationAmount: {$sum : "$CancellationAmount"}
                  
      }},
      {$sort: {CancellationAmount: -1}},
      {$project: { CancellationDate : "$_id.CancellationDate",count:1,seats:1,CancellationAmount:1}},
      
     
      { $out: "Cancellation"} 
  ],
  { allowDiskUse: true })
  
//Cancellation API Source wise
db.getCollection("Whole_Rec").aggregate([
	{$match: { $or: [{ CancellationDate: {$ne : ""} }, { CancellationAmount: {$gt: 0.0 } }] }},
    {
      $group:{
        _id: {"APISource":"$APISource","CancellationDate"  : "$CancellationDate"},
        
        count: { $sum : 1 },
        seats: {$sum : "$No_Of_Seats"},
        CancellationAmount: {$sum : "$CancellationAmount"}
                  
      }},
      {$sort: {CancellationAmount: -1}},
      {$project: { APISource:"$_id.APISource",CancellationDate : "$_id.CancellationDate",count:1,seats:1,CancellationAmount:1}},
      
     
      { $out: "CancellationAPI"} 
  ],
  { allowDiskUse: true })
  
//cancellation agent wise 
db.getCollection("Whole_Rec").aggregate([
	{$match: { $or: [{ CancellationDate: {$ne : ""} }, { CancellationAmount: {$gt: 0.0 } }], Abhiid : {$eq: 6} }},
    {
      $group:{
        _id: {"Mobile":"$Mobile","CancellationDate"  : "$CancellationDate"},
        
        count: { $sum : 1 },
        seats: {$sum : "$No_Of_Seats"},
        CancellationAmount: {$sum : "$CancellationAmount"}
                  
      }},
      {$sort: {CancellationAmount: -1}},
      {$project: { Mobile:"$_id.Mobile",CancellationDate : "$_id.CancellationDate",count:1,seats:1,CancellationAmount:1}},
      
     
      { $out: "CancellationAgent"} 
  ],
  { allowDiskUse: true })
  
  
//cancellation booking platform wise 
db.getCollection("Whole_Rec").aggregate([
	{$match: { $or: [{ CancellationDate: {$ne : ""} }, { CancellationAmount: {$gt: 0.0 } }] }},
    {
      $group:{
        _id: {"BookingPlatform":"$BookingPlatform","CancellationDate"  : "$CancellationDate"},
        
        count: { $sum : 1 },
        seats: {$sum : "$No_Of_Seats"},
        CancellationAmount: {$sum : "$CancellationAmount"}
                  
      }},
      {$sort: {CancellationAmount: -1}},
      {$project: { BookingPlatform:"$_id.BookingPlatform",CancellationDate : "$_id.CancellationDate",count:1,seats:1,CancellationAmount:1}},
      
     
      { $out: "CancelPlatform"} 
  ],
  { allowDiskUse: true })
  
  
//cancellation operator,route wise
db.getCollection("Whole_Rec").aggregate([
	{$match: { $or: [{ CancellationDate: {$ne : ""} }, { CancellationAmount: {$gt: 0.0 } }] }},
    {
      $group:{
        _id:{"OperatorName":"$OperatorName","Source":"$Source","Destination":"$Destination","CancellationDate":"$CancellationDate"},
        count: { $sum : 1 },
        seats: {$sum : "$No_Of_Seats"},
        CancellationAmount: {$sum : "$CancellationAmount"}
                  
      }},
      {$sort: {CancellationAmount: -1}},
      {$project: {CancellationDate : "$_id.CancellationDate",OperatorName: "$_id.OperatorName",Source:"$_id.Source",Destination: "$_id.Destination",count:1,seats:1,CancellationAmount:1}},
     
      { $out: "CancellationOpRoute"} 
  ],
  { allowDiskUse: true })
 
//Cancellation operator wise 
db.getCollection("CancellationOpRoute").aggregate([
    {
      $group:{
        _id:{"OperatorName":"$OperatorName","CancellationDate": "$CancellationDate"},
        count: { $sum : "$count" },
        seats: {$sum : "$seats"},
        CancellationAmount: {$sum : "$CancellationAmount"}
                  
      }},
      {$sort: {CancellationAmount: -1}}
     
      
  ],
  { allowDiskUse: true })

//Cancellation route wise 
db.getCollection("CancellationOpRoute").aggregate([
    {
      $group:{
        _id:{"Source": "$Source","Destination":"$Destination","CancellationDate": "$CancellationDate"},
        count: { $sum : "$count" },
        seats: {$sum : "$seats"},
        CancellationAmount: {$sum : "$CancellationAmount"}
                  
      }},
      {$sort: {CancellationAmount: -1}}   
  ],
  { allowDiskUse: true })

  
  
//round trips 6/9/2017 8147872565      8125593938 - 30  9963775781-8  7893204765-6  8520984034-8  9908195462-6

db.getCollection("Whole_Rec").aggregate([
 	{ $match: { Abhiid : {$ne: 6}, BookedDate:"6/9/2017"}},
    {
      $group:{
        _id:{"Mobile":"$Mobile"},
        bookings: { $sum : 1 },
        seats: {$sum : "$No_Of_Seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }},
      {$sort: {bookings: -1}}
     

  ],
  { allowDiskUse: true })


db.getCollection("Whole_Rec").aggregate([
 	{ $match: { Abhiid : {$ne: 6}, BookedDate:"6/9/2017", Mobile: "9963775781"}},
    
     {$out: "RoundTrip1"}

  ],
  { allowDiskUse: true })
  

  
db.getCollection("Whole_Rec").aggregate([
 	{ $match: { Abhiid : {$ne: 6}, BookedDate:"6/9/2017", Mobile: "9297152162"}},
    
     {$out: "RoundTrip2"}

  ],
  { allowDiskUse: true })
  
  

  
  