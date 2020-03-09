var express = require('express');
var cors = require('cors');
var mysql = require('mysql');
var app= express();
var bodyParser = require("body-parser");
var open=require('open')
var ArrayList=require('arraylist')
// var rn = require('random-number');
var fs=require('fs');
var s=require('string');
// var sleep = require('system-sleep');
var lowerCase = require('lower-case');
var Case = require('case');
var nodemailer = require('nodemailer');
// var gen = rn.generator({
//   min:  1
// , max:  10000
// , integer: true
// })

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
var connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "jimmy1999",
    database : "se_project",
    insecureAuth : true
  });
  
connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to database.');
});
app.post('/login', function (req, res) {
  console.log('form');
    var username=req.body.username
    var password=req.body.password
    var type=req.body.type
    var login_success=0
    var p=0
     console.log(type);
     console.log(username);
     console.log(password);
     if(type=="admin")
    {
      connection.query('SELECT * from admin', function (error, results, fields) {
        if (error) throw error;
        var length=results.length
        var flag=0;
        for(i=0;i<length;i++)
        {
            
            console.log('\nThe solution is: ', results[i].a_username , results[i].a_password);
            if(username==results[i].a_name)
            {
                if(password==results[i].a_password)
                {
                    flag=1;
                }
            }
           

            }
            if(flag==1)
            {
              console.log('valid');
              login_success=1;
              
              res.send({log : login_success })
                 res.end()
            }
            else{
              console.log(' not valid');
              res.send({log : login_success})
                res.end();  

        }
    });
    }
    else if(type=="teacher")
    {
    connection.query('SELECT * from teacher', function (error, results, fields) {
            if (error) throw error;
            var length=results.length
            var flag=0;
            for(i=0;i<length;i++)
            {
                
                console.log('\nThe solution is: ', results[i].t_name , results[i].t_password);
                if(username==results[i].t_name)
                {
                    if(password==results[i].t_password)
                    {
                        flag=1;
                    }
                }
          
            }
            if(flag==1)
            {
              console.log('valid');
              login_success=2;
              res.send({log : login_success })
              
                 res.end()
            }
            else{
              console.log(' not valid');
              res.send({log : login_success})
                res.end();  

            }
        });
    }
  });
  app.post('/retrieve', function (req, res) {
    var day=req.body.day
    var periods=req.body.periods
    var p=s(periods).splitRight('-')
    var years=req.body.year
    var y=s(years).splitRight(',')
    var branches=req.body.B
    var b=s(branches).splitRight(',')
    var date=req.body.date
    var teachers=[]
    var rooms=[]
    var cap=[]
    var div=[]
    var difc=[]
    var b2=[]
    var s2=[]
    var flag1=0
    console.log(p)
    console.log(day)
    console.log(y)
    console.log(b)
    console.log(date)

// Rooms
connection.query('SELECT * from room where room_no not in(SELECT room_no from allocation where date="'+date+'" )', function (error, results, fields) {
  if (error) throw error;
  var length=results.length

  for(i=0;i<length;i++)
  {
    rooms.push(results[i].room_no)
    cap.push(results[i].capacity)
  
  }    
  console.log(rooms)  
  console.log(cap)  
 });
//branches
connection.query('SELECT * from allocation where date="'+date+'"', function (error, results, fields) {
  if (error) throw error;
  var length=results.length
  for(i=0;i<length;i++)
  {
     console.log('date matched')
      var b3=s(results[i].division).splitRight(',')
      var s3=s(results[i].roll_no).splitRight(',')    
      var num=b3.length
      for(j=0;j<num;j++)
      {
        b2.push(b3[j])
        s2.push(s(s3[j]).toInt())
      }
   }     
 });

connection.query('SELECT * from branch', function (error, results, fields) {
  if (error) throw error;
  var length=results.length
console.log('branch')
console.log('div',b2)
console.log('str',s2)
  for(i=0;i<length;i++)
  {
    var br=results[i].division
    var c=results[i].roll_no
    var num=b2.length
    var dif=s(c).toInt()
    for(j=0;j<num;j++){
      if(b2[j]===br)
      {
        dif=dif-s2[j]
      }
    }
    difc.push(dif)
    div.push(br+" "+"-"+" "+dif)
  }    
  
  console.log(div)  
  
 });

// available invigilators
      if(day=='mon')
      {
        connection.query('SELECT * from teacher where t_name not in(select invigilator from allocation where date="'+date+'" )', function (error, results, fields) {
          if (error) throw error;
          var length=results.length
          var flag=0;
          for(i=0;i<length;i++)
          {
            var k=results[i].mon
            var teach=results[i].t_name
            console.log('i',i)
            console.log(k)
            if((((k.charAt(0)==='0')&&(k.charAt(1)==='0'))&& y.includes('1'))||(((k.charAt(0)==='0')&&(k.charAt(1)==='1'))&& y.includes('2'))||(((k.charAt(0)==='1')&&(k.charAt(1)==='0'))&& y.includes('3'))||(((k.charAt(0)==='1')&&(k.charAt(1)==='1'))&& y.includes('4')))
            {
              console.log('eureka')
              if((((k.charAt(2)==='0')&&(k.charAt(3)==='0'))&& b.includes('cse'))||(((k.charAt(2)==='0')&&(k.charAt(3)==='1'))&& b.includes('ece'))||(((k.charAt(2)==='1')&&(k.charAt(3)==='0'))&& b.includes('mec'))||(((k.charAt(2)==='1')&&(k.charAt(3)==='1'))&& b.includes('civ')))
              {
                 console.log('ur in')
                 console.log(teach)
                 var t=[]
            
                 teachers.push(teach)
              }
              else
            {
              console.log('hey ur here')
              var f=0
              for(j=s(p[0]).toInt()+3;j<=s(p[1]).toInt()+3;j++)
              {
                console.log(j)
                console.log(k.charAt(j))
               if(k.charAt(j)==='1')
              {
                console.log('gotcha')
                f=1
              }
              }
              if(f===0)
              {
           
                teachers.push(teach)
              }
            }
            }
            else
            {
              console.log('hey ur here')
              var f=0
              for(j=s(p[0]).toInt()+3;j<=s(p[1]).toInt()+3;j++)
              {
                console.log(j)
                console.log(k.charAt(j))
               if(k.charAt(j)==='1')
              {
                console.log('gotcha')
                f=1
              }
              }
              if(f===0)
              {
          
                teachers.push(teach)
              }
            }
            
          }
          console.log(teachers)
        
         
          if(teachers.length===0)
          {
            console.log("mon  no teachers")
              if (error) throw error;
              var length=results.length
              var ck=[]
              
              for(i=0;i<length;i++)
              {
                var k=results[i].mon
                count=0
                for(j=s(p[0]).toInt()+3;j<=s(p[1]).toInt()+3;j++)
                {
                  console.log('char',k.charAt(j))
                 if(k.charAt(j)==='0')
                {
                  count=count+1
                }
                
                }
                ck.push(count)  
                teachers.push(results[i].t_name)        
              }    
              console.log('ck',ck)
              console.log('teach',teachers)
              for(i=0;i<length;i++)
              {
                for(j=0;j<length-i-1;j++)
                {
                   if(s(ck[j]).toInt()<s(ck[j+1]).toInt())
                   {
                     temp=ck[j+1]
                     ck[j+1]=ck[j]
                     ck[j]=temp
                     temp1=teachers[j+1]
                     teachers[j+1]=teachers[j]
                     teachers[j]=temp1
                   }
                }
              }
              console.log('sorted teach',teachers)
              res.send({teach : teachers ,rooms:rooms,capacity:cap ,div:div})
              res.end()    
          }
          else{
            res.send({teach : teachers ,rooms:rooms,capacity:cap,div:div })
            res.end()
          }  
         
         });
      }
      else if(day=='tue'){
        connection.query('SELECT * from teacher where t_name not in(select invigilator from allocation where date="'+date+'" )', function (error, results, fields) {
          if (error) throw error;
          var length=results.length
          var flag=0;
          for(i=0;i<length;i++)
          {
            var k=results[i].tue
            var teach=results[i].t_name
            console.log('i',i)
            console.log(k)
            if((((k.charAt(0)==='0')&&(k.charAt(1)==='0'))&& y.includes('1'))||(((k.charAt(0)==='0')&&(k.charAt(1)==='1'))&& y.includes('2'))||(((k.charAt(0)==='1')&&(k.charAt(1)==='0'))&& y.includes('3'))||(((k.charAt(0)==='1')&&(k.charAt(1)==='1'))&& y.includes('4')))
            {
              console.log('eureka')
              if((((k.charAt(2)==='0')&&(k.charAt(3)==='0'))&& b.includes('cse'))||(((k.charAt(2)==='0')&&(k.charAt(3)==='1'))&& b.includes('ece'))||(((k.charAt(2)==='1')&&(k.charAt(3)==='0'))&& b.includes('mec'))||(((k.charAt(2)==='1')&&(k.charAt(3)==='1'))&& b.includes('civ')))
              {
                 console.log('ur in')
                 console.log(teach)
                 var t=[]
            
                 teachers.push(teach)
              }
              else
            {
              console.log('hey ur here')
              var f=0
              for(j=s(p[0]).toInt()+3;j<=s(p[1]).toInt()+3;j++)
              {
                console.log(j)
                console.log(k.charAt(j))
               if(k.charAt(j)==='1')
              {
                console.log('gotcha')
                f=1
              }
              }
              if(f===0)
              {
           
                teachers.push(teach)
              }
            }
            }
            else
            {
              console.log('hey ur here')
              var f=0
              for(j=s(p[0]).toInt()+3;j<=s(p[1]).toInt()+3;j++)
              {
                console.log(j)
                console.log(k.charAt(j))
               if(k.charAt(j)==='1')
              {
                console.log('gotcha')
                f=1
              }
              }
              if(f===0)
              {
          
                teachers.push(teach)
              }
            }
            
          }
          console.log(teachers)
        
         
          if(teachers.length===0)
          {
            console.log("tue  no teachers")
              if (error) throw error;
              var length=results.length
              var ck=[]
              
              for(i=0;i<length;i++)
              {
                var k=results[i].tue
                count=0
                for(j=s(p[0]).toInt()+3;j<=s(p[1]).toInt()+3;j++)
                {
                  console.log('char',k.charAt(j))
                 if(k.charAt(j)==='0')
                {
                  count=count+1
                }
                
                }
                ck.push(count)  
                teachers.push(results[i].t_name)        
              }    
              console.log('ck',ck)
              console.log('teach',teachers)
              for(i=0;i<length;i++)
              {
                for(j=0;j<length-i-1;j++)
                {
                   if(s(ck[j]).toInt()<s(ck[j+1]).toInt())
                   {
                     temp=ck[j+1]
                     ck[j+1]=ck[j]
                     ck[j]=temp
                     temp1=teachers[j+1]
                     teachers[j+1]=teachers[j]
                     teachers[j]=temp1
                   }
                }
              }
              console.log('sorted teach',teachers)
              res.send({teach : teachers ,rooms:rooms,capacity:cap ,div:div})
              res.end()    
          }
          else{
            res.send({teach : teachers ,rooms:rooms,capacity:cap,div:div })
            res.end()
          }  
         
         });
      }
      else if(day=='wed'){
        connection.query('SELECT * from teacher where t_name not in(select invigilator from allocation where date="'+date+'" )', function (error, results, fields) {
          if (error) throw error;
          var length=results.length
          var flag=0;
          for(i=0;i<length;i++)
          {
            var k=results[i].wed
            var teach=results[i].t_name
            console.log('i',i)
            console.log(k)
            if((((k.charAt(0)==='0')&&(k.charAt(1)==='0'))&& y.includes('1'))||(((k.charAt(0)==='0')&&(k.charAt(1)==='1'))&& y.includes('2'))||(((k.charAt(0)==='1')&&(k.charAt(1)==='0'))&& y.includes('3'))||(((k.charAt(0)==='1')&&(k.charAt(1)==='1'))&& y.includes('4')))
            {
              console.log('eureka')
              if((((k.charAt(2)==='0')&&(k.charAt(3)==='0'))&& b.includes('cse'))||(((k.charAt(2)==='0')&&(k.charAt(3)==='1'))&& b.includes('ece'))||(((k.charAt(2)==='1')&&(k.charAt(3)==='0'))&& b.includes('mec'))||(((k.charAt(2)==='1')&&(k.charAt(3)==='1'))&& b.includes('civ')))
              {
                 console.log('ur in')
                 console.log(teach)
                 var t=[]
            
                 teachers.push(teach)
              }
              else
            {
              console.log('hey ur here')
              var f=0
              for(j=s(p[0]).toInt()+3;j<=s(p[1]).toInt()+3;j++)
              {
                console.log(j)
                console.log(k.charAt(j))
               if(k.charAt(j)==='1')
              {
                console.log('gotcha')
                f=1
              }
              }
              if(f===0)
              {
           
                teachers.push(teach)
              }
            }
            }
            else
            {
              console.log('hey ur here')
              var f=0
              for(j=s(p[0]).toInt()+3;j<=s(p[1]).toInt()+3;j++)
              {
                console.log(j)
                console.log(k.charAt(j))
               if(k.charAt(j)==='1')
              {
                console.log('gotcha')
                f=1
              }
              }
              if(f===0)
              {
          
                teachers.push(teach)
              }
            }
            
          }
          console.log(teachers)
        
         
          if(teachers.length===0)
          {
            console.log("wed  no teachers")
              if (error) throw error;
              var length=results.length
              var ck=[]
              
              for(i=0;i<length;i++)
              {
                var k=results[i].wed
                count=0
                for(j=s(p[0]).toInt()+3;j<=s(p[1]).toInt()+3;j++)
                {
                  console.log('char',k.charAt(j))
                 if(k.charAt(j)==='0')
                {
                  count=count+1
                }
                
                }
                ck.push(count)  
                teachers.push(results[i].t_name)        
              }    
              console.log('ck',ck)
              console.log('teach',teachers)
              for(i=0;i<length;i++)
              {
                for(j=0;j<length-i-1;j++)
                {
                   if(s(ck[j]).toInt()<s(ck[j+1]).toInt())
                   {
                     temp=ck[j+1]
                     ck[j+1]=ck[j]
                     ck[j]=temp
                     temp1=teachers[j+1]
                     teachers[j+1]=teachers[j]
                     teachers[j]=temp1
                   }
                }
              }
              console.log('sorted teach',teachers)
              res.send({teach : teachers ,rooms:rooms,capacity:cap,div:div })
              res.end()    
          }
          else{
            res.send({teach : teachers ,rooms:rooms,capacity:cap,div:div })
            res.end()
          }  
         
         });
      
      }

      else if(day=='thu'){
        connection.query('SELECT * from teacher where t_name not in(select invigilator from allocation where date="'+date+'" )', function (error, results, fields) {
          if (error) throw error;
          var length=results.length
          var flag=0;
          for(i=0;i<length;i++)
          {
            var k=results[i].thu
            var teach=results[i].t_name
            console.log('i',i)
            console.log(k)
            if((((k.charAt(0)==='0')&&(k.charAt(1)==='0'))&& y.includes('1'))||(((k.charAt(0)==='0')&&(k.charAt(1)==='1'))&& y.includes('2'))||(((k.charAt(0)==='1')&&(k.charAt(1)==='0'))&& y.includes('3'))||(((k.charAt(0)==='1')&&(k.charAt(1)==='1'))&& y.includes('4')))
            {
              console.log('eureka')
              if((((k.charAt(2)==='0')&&(k.charAt(3)==='0'))&& b.includes('cse'))||(((k.charAt(2)==='0')&&(k.charAt(3)==='1'))&& b.includes('ece'))||(((k.charAt(2)==='1')&&(k.charAt(3)==='0'))&& b.includes('mec'))||(((k.charAt(2)==='1')&&(k.charAt(3)==='1'))&& b.includes('civ')))
              {
                 console.log('ur in')
                 console.log(teach)
                 var t=[]
            
                 teachers.push(teach)
              }
              else
            {
              console.log('hey ur here')
              var f=0
              for(j=s(p[0]).toInt()+3;j<=s(p[1]).toInt()+3;j++)
              {
                console.log(j)
                console.log(k.charAt(j))
               if(k.charAt(j)==='1')
              {
                console.log('gotcha')
                f=1
              }
              }
              if(f===0)
              {
           
                teachers.push(teach)
              }
            }
            }
            else
            {
              console.log('hey ur here')
              var f=0
              for(j=s(p[0]).toInt()+3;j<=s(p[1]).toInt()+3;j++)
              {
                console.log(j)
                console.log(k.charAt(j))
               if(k.charAt(j)==='1')
              {
                console.log('gotcha')
                f=1
              }
              }
              if(f===0)
              {
          
                teachers.push(teach)
              }
            }
            
          }
          console.log(teachers)
        
         
          if(teachers.length===0)
          {
            console.log("thu  no teachers")
              if (error) throw error;
              var length=results.length
              var ck=[]
              
              for(i=0;i<length;i++)
              {
                var k=results[i].thu
                count=0
                for(j=s(p[0]).toInt()+3;j<=s(p[1]).toInt()+3;j++)
                {
                  console.log('char',k.charAt(j))
                 if(k.charAt(j)==='0')
                {
                  count=count+1
                }
                
                }
                ck.push(count)  
                teachers.push(results[i].t_name)        
              }    
              console.log('ck',ck)
              console.log('teach',teachers)
              for(i=0;i<length;i++)
              {
                for(j=0;j<length-i-1;j++)
                {
                   if(s(ck[j]).toInt()<s(ck[j+1]).toInt())
                   {
                     temp=ck[j+1]
                     ck[j+1]=ck[j]
                     ck[j]=temp
                     temp1=teachers[j+1]
                     teachers[j+1]=teachers[j]
                     teachers[j]=temp1
                   }
                }
              }
              console.log('sorted teach',teachers)
              res.send({teach : teachers ,rooms:rooms,capacity:cap,div:div })
              res.end()    
          }
          else{
            res.send({teach : teachers ,rooms:rooms,capacity:cap,div:div })
            res.end()
          }  
         
         });
      }
      else if(day=='fri'){
        connection.query('SELECT * from teacher where t_name not in(select invigilator from allocation where date="'+date+'" )', function (error, results, fields) {
          if (error) throw error;
          var length=results.length
          var flag=0;
          for(i=0;i<length;i++)
          {
            var k=results[i].fri
            var teach=results[i].t_name
            console.log('i',i)
            console.log(k)
            if((((k.charAt(0)==='0')&&(k.charAt(1)==='0'))&& y.includes('1'))||(((k.charAt(0)==='0')&&(k.charAt(1)==='1'))&& y.includes('2'))||(((k.charAt(0)==='1')&&(k.charAt(1)==='0'))&& y.includes('3'))||(((k.charAt(0)==='1')&&(k.charAt(1)==='1'))&& y.includes('4')))
            {
              console.log('eureka')
              if((((k.charAt(2)==='0')&&(k.charAt(3)==='0'))&& b.includes('cse'))||(((k.charAt(2)==='0')&&(k.charAt(3)==='1'))&& b.includes('ece'))||(((k.charAt(2)==='1')&&(k.charAt(3)==='0'))&& b.includes('mec'))||(((k.charAt(2)==='1')&&(k.charAt(3)==='1'))&& b.includes('civ')))
              {
                 console.log('ur in')
                 console.log(teach)
                 var t=[]
            
                 teachers.push(teach)
              }
              else
            {
              console.log('hey ur here')
              var f=0
              for(j=s(p[0]).toInt()+3;j<=s(p[1]).toInt()+3;j++)
              {
                console.log(j)
                console.log(k.charAt(j))
               if(k.charAt(j)==='1')
              {
                console.log('gotcha')
                f=1
              }
              }
              if(f===0)
              {
           
                teachers.push(teach)
              }
            }
            }
            else
            {
              console.log('hey ur here')
              var f=0
              for(j=s(p[0]).toInt()+3;j<=s(p[1]).toInt()+3;j++)
              {
                console.log(j)
                console.log(k.charAt(j))
               if(k.charAt(j)==='1')
              {
                console.log('gotcha')
                f=1
              }
              }
              if(f===0)
              {
          
                teachers.push(teach)
              }
            }
            
          }
          console.log(teachers)
        
         
          if(teachers.length===0)
          {
            console.log("fri  no teachers")
              if (error) throw error;
              var length=results.length
              var ck=[]
              
              for(i=0;i<length;i++)
              {
                var k=results[i].fri
                count=0
                for(j=s(p[0]).toInt()+3;j<=s(p[1]).toInt()+3;j++)
                {
                  console.log('char',k.charAt(j))
                 if(k.charAt(j)==='0')
                {
                  count=count+1
                }
                
                }
                ck.push(count)  
                teachers.push(results[i].t_name)        
              }    
              console.log('ck',ck)
              console.log('teach',teachers)
              for(i=0;i<length;i++)
              {
                for(j=0;j<length-i-1;j++)
                {
                   if(s(ck[j]).toInt()<s(ck[j+1]).toInt())
                   {
                     temp=ck[j+1]
                     ck[j+1]=ck[j]
                     ck[j]=temp
                     temp1=teachers[j+1]
                     teachers[j+1]=teachers[j]
                     teachers[j]=temp1
                   }
                }
              }
              console.log('sorted teach',teachers)
              res.send({teach : teachers ,rooms:rooms,capacity:cap,div:div })
              res.end()    
          }
          else{
            res.send({teach : teachers ,rooms:rooms,capacity:cap,div:div })
            res.end()
          }  
         
         });
      }
      else if(day=='sat'){
        connection.query('SELECT * from teacher where t_name not in(select invigilator from allocation where date="'+date+'" )', function (error, results, fields) {
          if (error) throw error;
          var length=results.length
          var flag=0;
          for(i=0;i<length;i++)
          {
            var k=results[i].sat
            var teach=results[i].t_name
            console.log('i',i)
            console.log(k)
            if((((k.charAt(0)==='0')&&(k.charAt(1)==='0'))&& y.includes('1'))||(((k.charAt(0)==='0')&&(k.charAt(1)==='1'))&& y.includes('2'))||(((k.charAt(0)==='1')&&(k.charAt(1)==='0'))&& y.includes('3'))||(((k.charAt(0)==='1')&&(k.charAt(1)==='1'))&& y.includes('4')))
            {
              console.log('eureka')
              if((((k.charAt(2)==='0')&&(k.charAt(3)==='0'))&& b.includes('cse'))||(((k.charAt(2)==='0')&&(k.charAt(3)==='1'))&& b.includes('ece'))||(((k.charAt(2)==='1')&&(k.charAt(3)==='0'))&& b.includes('mec'))||(((k.charAt(2)==='1')&&(k.charAt(3)==='1'))&& b.includes('civ')))
              {
                 console.log('ur in')
                 console.log(teach)
                 var t=[]
            
                 teachers.push(teach)
              }
              else
            {
              console.log('hey ur here')
              var f=0
              for(j=s(p[0]).toInt()+3;j<=s(p[1]).toInt()+3;j++)
              {
                console.log(j)
                console.log(k.charAt(j))
               if(k.charAt(j)==='1')
              {
                console.log('gotcha')
                f=1
              }
              }
              if(f===0)
              {
           
                teachers.push(teach)
              }
            }
            }
            else
            {
              console.log('hey ur here')
              var f=0
              for(j=s(p[0]).toInt()+3;j<=s(p[1]).toInt()+3;j++)
              {
                console.log(j)
                console.log(k.charAt(j))
               if(k.charAt(j)==='1')
              {
                console.log('gotcha')
                f=1
              }
              }
              if(f===0)
              {
          
                teachers.push(teach)
              }
            }
            
          }
          console.log(teachers)
        
         
          if(teachers.length===0)
          {
            console.log("Sat  no teachers")
              if (error) throw error;
              var length=results.length
              var ck=[]
              
              for(i=0;i<length;i++)
              {
                var k=results[i].sat
                count=0
                for(j=s(p[0]).toInt()+3;j<=s(p[1]).toInt()+3;j++)
                {
                  console.log('char',k.charAt(j))
                 if(k.charAt(j)==='0')
                {
                  count=count+1
                }
                
                }
                ck.push(count)  
                teachers.push(results[i].t_name)        
              }    
              console.log('ck',ck)
              console.log('teach',teachers)
              for(i=0;i<length;i++)
              {
                for(j=0;j<length-i-1;j++)
                {
                   if(s(ck[j]).toInt()<s(ck[j+1]).toInt())
                   {
                     temp=ck[j+1]
                     ck[j+1]=ck[j]
                     ck[j]=temp
                     temp1=teachers[j+1]
                     teachers[j+1]=teachers[j]
                     teachers[j]=temp1
                   }
                }
              }
              console.log('sorted teach',teachers)
              res.send({teach : teachers ,rooms:rooms,capacity:cap,div:div })
              res.end()    
          }
          else{
            res.send({teach : teachers ,rooms:rooms,capacity:cap,div:div })
            res.end()
          }  
         
         });
      }
    

  });


  //insert

  app.post('/insert', function (req, res) {
    console.log("hi");
    var date=req.body.date
  var room=req.body.room
  var inv=req.body.inv
  var branch=req.body.branch
  var strength=req.body.strength
  var div=req.body.div
  var B=req.body.B
  var cap=req.body.cap
  var st=0
  var log=0
    console.log("hii");
    console.log(date);
    console.log(room);
    console.log(inv);
    console.log(branch);
    console.log(strength);
    console.log(div);
    console.log(B);
    console.log(cap);
//strength total
var s1=s(strength).splitRight(',')
console.log(s1)
   for(i=0;i<s1.length;i++)
   {
     st=st+s(s1[i]).toInt()
   } 

   if(st>cap)
   {
     log=1
   }
//branch
var b=s(B).splitRight(',')
var b1=s(branch).splitRight(',')
console.log(b)
   for(i=0;i<b1.length;i++)
   {
     var b2=s(b1[i]).splitRight('-')
     if(!b.includes(Case.lower(b2[0])))
     {
      console.log(Case.lower(b2[0]))
      console.log('wrong bro')
       log=2
     }
   } 
//strength branch vise
var d=s(div).splitRight(',')
console.log(d)
for(j=0;j<b1.length;j++)
{
  for(i=0;i<d.length;i++){
    var b4=s(d[i]).splitRight(' ')
    console.log('b1',b1[j])
    console.log('b4',b4[0])
  
    if(b1[j]===b4[0])
    {
      console.log('same')
      console.log(b4[2])
      console.log(s1[j])
      if(s(s1[j]).toInt()>s(b4[2]).toInt())
      {
        console.log('over')
        log=3
      }
    }
  }
}
if(b1.length!=s1.length)
{
  log=4
}

if(log===0)
{
  connection.query("INSERT INTO allocation (date,room_no,invigilator,division,roll_no) VALUES ('"+date+"','"+room+"','"+inv+"','"+branch+"','"+strength+"')", function (err, result, fields) {
    
    if (err) {throw err
     console.log("hi");
   };
     
     console.log("result :"+result);
     });


     var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'SE Proj',
        pass: 'seproj12345',
      }
    });

    var mailOptions = {
      from: 'seproj32@gmail.com',
      to: 'nswaroop1999@gmail.com',
      subject: 'hi ra',
      text: 'po ra '
    };
    

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

}



console.log(log)
   res.send({log : log })


});

//info


app.post('/info', function (req, res) {
  console.log("hi");
var date=req.body.date1
var room=[]
var inv=[]
var branch=[]
var strength=[]

connection.query('SELECT * from allocation', function (error, results, fields) {
  if (error) throw error;
  var length=results.length

  for(i=0;i<length;i++)
  {
  console.log(date)
  console.log(results[i].date)
    if(date===results[i].date)
    {
      room.push(results[i].room_no)
      inv.push(results[i].invigilator)
      branch.push(results[i].division)
      strength.push(results[i].roll_no)
    }
  }   
  console.log(room.toString())
 console.log(inv.toString())
 console.log(branch.toString())
 console.log(strength.toString())
 res.send({room : room.join("  ;  "),inv : inv.join("  ;  "),branch : branch.join("  ;  "),strength :strength.join("  ;  ") })
 res.end()
 });

 




});

app.post('/alloted', function (req, res) {
  console.log("hi");
var name=req.body.name
var room=[]
var inv=[]
var branch=[]
var strength=[]
var date=[]
var detail=[]
connection.query('SELECT * from allocation', function (error, results, fields) {
  if (error) throw error;
  var length=results.length

  for(i=0;i<length;i++)
  {
  console.log(name)
  console.log(results[i].invigilator)
    if(name===results[i].invigilator)
    {
      room.push(results[i].room_no)
      date.push(results[i].date)
      branch.push(results[i].division)
      strength.push(results[i].roll_no)
    }
  }   
  console.log(room.toString())
 console.log(date.toString())
 console.log(branch.toString())
 console.log(strength.toString())
 var n=date.length
 console.log(n)
 for(i=0;i<n;i++)
 {
 detail[i]=date[i]+" ||  "+room[i]+"  || "+branch[i]+"  ||                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    "+strength[i]
 }  
 console.log(detail)
 res.send({detail : detail})
 res.end()
 });

 




});

//insert update table

 app.post('/insert', function (req, res) {
    console.log("hi");
    var date=req.body.date
  var room=req.body.room
  var inv=req.body.inv
  var branch=req.body.branch
  var strength=req.body.strength
  var div=req.body.div
  var B=req.body.B
  var cap=req.body.cap
  var st=0
  var log=0
    console.log("hii");
    console.log(date);
    console.log(room);
    console.log(inv);
    console.log(branch);
    console.log(strength);
    console.log(div);
    console.log(B);
    console.log(cap);
//strength total
var s1=s(strength).splitRight(',')
console.log(s1)
   for(i=0;i<s1.length;i++)
   {
     st=st+s(s1[i]).toInt()
   } 

   if(st>cap)
   {
     log=1
   }
//branch
var b=s(B).splitRight(',')
var b1=s(branch).splitRight(',')
console.log(b)
   for(i=0;i<b1.length;i++)
   {
     var b2=s(b1[i]).splitRight('-')
     if(!b.includes(Case.lower(b2[0])))
     {
      console.log(Case.lower(b2[0]))
      console.log('wrong bro')
       log=2
     }
   } 
//strength branch vise
var d=s(div).splitRight(',')
console.log(d)
for(j=0;j<b1.length;j++)
{
  for(i=0;i<d.length;i++){
    var b4=s(d[i]).splitRight(' ')
    console.log('b1',b1[j])
    console.log('b4',b4[0])
  
    if(b1[j]===b4[0])
    {
      console.log('same')
      console.log(b4[2])
      console.log(s1[j])
      if(s(s1[j]).toInt()>s(b4[2]).toInt())
      {
        console.log('over')
        log=3
      }
    }
  }
}
if(b1.length!=s1.length)
{
  log=4
}

if(log===0)
{
  connection.query("INSERT INTO allocation (date,room_no,invigilator,division,roll_no) VALUES ('"+date+"','"+room+"','"+inv+"','"+branch+"','"+strength+"')", function (err, result, fields) {
    
    if (err) {throw err
     console.log("hi");
   };
     
     console.log("result :"+result);
     });


     var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'SE Proj',
        pass: 'seproj12345',
      }
    });

    var mailOptions = {
      from: 'seproj32@gmail.com',
      to: 'nswaroop1999@gmail.com',
      subject: 'hi ra',
      text: 'po ra '
    };
    

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

}
console.log(log)
   res.send({log : log })


});
//insert update
app.post('/insert_upd', function (req, res) {
  console.log("hi");
  var date=req.body.date
var reason=req.body.reason
var name=req.body.name
  console.log("hii");
  console.log(date);
  console.log(reason);
  console.log(name);
connection.query("INSERT INTO upd (name,date,reason) VALUES ('"+name+"','"+date+"','"+reason+"')", function (err, result, fields) {
  
  if (err) {throw err
   console.log("hi");
 };
   
   console.log("result :"+result);
   });
});

app.post('/i_up', function (req, res) {
  console.log("hi");
var name=[]
var date=[]
var reason=[]
connection.query('SELECT * from upd', function (error, results, fields) {
  if (error) throw error;
  var length=results.length

  for(i=0;i<length;i++)
  {


      name.push(results[i].name)
      date.push(results[i].date)
      reason.push(results[i].reason)
    
  }   
 res.send({name : name,date:date,reason:reason})
 res.end()
 });
});

app.post('/get', function (req, res) {
  console.log("hisds");
var name=req.body.name
var date=req.body.date
var rname=[]
connection.query('SELECT * from allocation', function (error, results, fields) {
  if (error) throw error;
  var length=results.length

  for(i=0;i<length;i++)
  {
     if(date===results[i].date)
     {
      
        rname.push(results[i].invigilator)
      
    }
  }   
  console.log(rname)
 });
 var r1name=[]
 connection.query('SELECT * from teacher', function (error, results, fields) {
  if (error) throw error;
  var length=results.length

  for(i=0;i<length;i++)
  {
      if(rname.includes(results[i].t_name))
      {
        console.log("same")
      }
      else{
        r1name.push(results[i].t_name)
      }
  
  }   
  console.log(r1name)
 res.send({name : r1name})
 res.end()
 });
});


app.post('/update', function (req, res) {
  console.log("hiadam");
var cname=req.body.cname
var name=req.body.name
var date=req.body.date
var rname=[]
console.log(name)
console.log(cname)
console.log(date)


connection.query('update allocation set invigilator= "'+cname+'"  where invigilator= "'+name+'" and date="'+date+'"', function (err, result, fields) {
  
  if (err) {throw err,
   console.log(err);
 };
   
   console.log("result :"+result);
   });

  //  connection.query("delete  from upd where name='"+name+"' date='"+date+"'" , function (error, results, fields) {
  //   if (error) throw error;
  //   var length=results.length
  //    }); 
});


app.post('/delete', function (req, res) {
  console.log("hiadam");
var name=req.body.name
var date=req.body.date
console.log(name)
console.log(date)
   connection.query("delete  from upd where name='"+name+"' date='"+date+"'" , function (error, results, fields) {
    if (error) throw error;
    var length=results.length
     }); 

     var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'SE Proj',
        pass: 'seproj12345',
      }
    });

    var mailOptions = {
      from: 'seproj32@gmail.com',
      to: 'nswaroop1999@gmail.com',
      subject: 'hi ra',
      text: 'po ra '
    };
    

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
});

app.listen(8000);