export let data = {
  question: [
    {
      question_id: 0,
      username: 'human_001',
      title:
        "How to define ObjectId type of dynamic object's properties in mongoose schema?",
      image:
        'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
      text: `<p>The current schema looks like this:</p><pre class="ql-syntax" spellcheck="false">const schema = new mongoose.Schema(
        filters: {
            type: Object,
            default: {}
        }
    );
    </pre><p>Sample Input Document:</p><pre class="ql-syntax" spellcheck="false">{
      filters: {
        field1: "5a934e000102030405000001",
        field2: "5a934e000102030405000002",
        field3: "5a934e000102030405000003"
      }
    }
    </pre><p>The&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">filters</code>&nbsp;object property will store dynamic properties/fields but all will be&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">ObjectId</code>&nbsp;type,</p><p>Currently, I am using pre-hook and lodash methods to convert type into ObjectId type,</p><pre class="ql-syntax" spellcheck="false">SchemaObj.pre('save', function (next) {
        this.filters = _.reduce(this.filters, (r, v, k) =&gt; v ? { ...r, [k]: mongoose.Types.ObjectId(v) } : r, {});
        next();
    });
    </pre><p>Is there any way to define ObjectId type of dynamic object fields?</p><p>I am expecting something like this if mongoose provide any other approach:</p><pre class="ql-syntax" spellcheck="false">const schema = new mongoose.Schema(
        filters: {
            type: {
              *: mongoose.Types.ObjectId
            }
        }
    );
    </pre><p><br></p>`,
      vote_result: 0,
      views: 0,
      created_time: '2022. 12. 22. 오전 11:30:23',
      modified_time: '2022. 12. 22. 오전 11:30:23',
      tags: ['mongodb', 'mongose'],
    },
    {
      question_id: 1,
      username: 'human_001',
      title: 'Correct video not playing when button 3 is clicked',
      image:
        'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
      text: `<p>How would this be debugged and fixed?</p><p>I am finding the code incredibly difficult to debug.</p><p>How would this issue be fixed in the code?</p><p>I want the code to work how it works in the&nbsp;<strong>demo code</strong>:&nbsp;<a href="https://jsfiddle.net/awht6u37/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/awht6u37/</a></p><p>Where this&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">data-id</code>&nbsp;works:</p><pre class="ql-syntax" spellcheck="false">&lt;button class="playSingle2 cover" type="button" data-container="play1" data-id="-Xgi_way56U"&gt;&lt;/button&gt;
      </pre><p>How do I fix the problem that is in the code presently&nbsp;<strong>after adding</strong>&nbsp;the&nbsp;<strong>answer code</strong>&nbsp;that was&nbsp;<strong>given below</strong>?</p><p>Where the behavior in the demo code:&nbsp;<a href="https://jsfiddle.net/awht6u37/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/awht6u37/</a></p><p>The correct video appears here when clicking on&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">&lt;button&gt;</code>&nbsp;<strong>#3</strong>.</p><pre class="ql-syntax" spellcheck="false">&lt;div class="playButtonContainer with-curtain "&gt;
        &lt;button class="playSingle0 cover" data-container="play1"&gt;&lt;/button&gt;
        &lt;button class="playSingle1 cover" data-container="play1"&gt;&lt;/button&gt;
        &lt;button class="playSingle2 cover" data-container="play1" data-id="-Xgi_way56U"&gt;&lt;/button&gt;
      &lt;/div&gt;
      
      function findPlayers() {
          const buttons = document.querySelectorAll(".cover");
          const wrapper = document.querySelector(".wrap");
          buttons.forEach(function addToPlayers(button) {
            players.push({
              "cover": button,
              "wrapper": wrapper
            });
          });
        }
      
      for (let i = 0; i &lt; 3; i++) {
          players.add(".playSingle" + i, (playerVarsList[i] || {}));
        }
      </pre><p><strong>Should work the same way</strong>&nbsp;as&nbsp;<strong>this code</strong>&nbsp;here with 3 buttons that is written differently.&nbsp;<a href="https://jsfiddle.net/7xz6gw1b/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/7xz6gw1b/</a></p><p>What in here would need to be written differently?</p><pre class="ql-syntax" spellcheck="false">function findPlayers() {
          const allCovers = document.querySelectorAll(".cover");
          const allWrappers = document.querySelectorAll(".wrap");
          allCovers.forEach(function addToPlayers(cover, index) {
            players.push({
              "cover": cover,
              "wrapper": (index &lt; allWrappers.length) ? allWrappers[index] : allWrappers[allWrappers.length - 1]
            });
          });
        }
      
      //to add the player to all the play buttons
        let totalPlayButtons = document.querySelectorAll('[data-container="play1"]').length;
      
        //looping over all the play buttons and adding player to that
        for (let i = 0; i &lt; totalPlayButtons; i++) {
          players.add(".playSingle" + i, (playerVarsList[i % (Object.keys(playerVarsList).length)] || {}));
        }
      </pre><p>Where in the demo code clicking on&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">&lt;button&gt;</code>&nbsp;<strong>#3</strong>&nbsp;that has no playlist given to it, instead plays the video from its&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">data-id=""</code></p><p><a href="https://i.stack.imgur.com/FkQB1.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/FkQB1.png" alt="enter image description here"></a></p><p><strong>To reproduce the issue:</strong></p><p>Here is the code with&nbsp;<strong>3</strong>&nbsp;buttons I am right now working on:&nbsp;<a href="https://jsfiddle.net/3htaxrse/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/3htaxrse/</a></p><p>When I click on&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">&lt;button&gt;</code>&nbsp;<strong>#3</strong></p><p><a href="https://i.stack.imgur.com/n22Nd.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/n22Nd.png" alt="enter image description here"></a></p><p>I am shown video from&nbsp;<strong>#1</strong></p><pre class="ql-syntax" spellcheck="false">0: {
            playerVars: {
              playlist: "0dgNc5S8cLI,mnfmQe8Mv1g,-Xgi_way56U,CHahce95B1g"
            }
          }, // Button 1
      </pre><p><a href="https://i.stack.imgur.com/5yRSE.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/5yRSE.png" alt="enter image description here"></a></p><p>Instead this is the video that should be seen.&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">data-id="-Xgi_way56U"</code></p><p><a href="https://i.stack.imgur.com/KAWln.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/KAWln.png" alt="enter image description here"></a></p><pre class="ql-syntax" spellcheck="false">&lt;div class="playButtonContainer with-curtain "&gt;
        &lt;button class="playSingle0 cover" data-container="play1"&gt;&lt;/button&gt;
        &lt;button class="playSingle1 cover" data-container="play1"&gt;&lt;/button&gt;
        &lt;button class="playSingle2 cover" data-container="play1" data-id="-Xgi_way56U"&gt;&lt;/button&gt;
      &lt;/div&gt;
      </pre><p>That is the problem I am trying to fix in the code I am working on.</p><p>How would the code with&nbsp;<strong>3 buttons</strong>&nbsp;that I am working on be adjusted so that, the&nbsp;<strong>correct</strong>&nbsp;video plays?&nbsp;<a href="https://jsfiddle.net/7xz6gw1b/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/7xz6gw1b/</a></p><p>Is there a way to look at how the&nbsp;<strong>demo code</strong>&nbsp;is&nbsp;<strong>written</strong>, to be able to make the appropriate changes in the&nbsp;<strong>other code</strong>?</p><p><a href="https://jsfiddle.net/7xz6gw1b/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/7xz6gw1b/</a></p><p>Because in the demo code it works as it should.</p><p><strong>Demo Code</strong>:&nbsp;<a href="https://jsfiddle.net/awht6u37/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/awht6u37/</a></p><p>Is looking at the&nbsp;<strong>demo code</strong>&nbsp;helpful at all?</p><p>Because it works in there.</p><p><strong>An attempt at fixing:</strong></p><p>Replacing this line:</p><pre class="ql-syntax" spellcheck="false">players.add(".playSingle" + i, (playerVarsList[i % (Object.keys(playerVarsList).length)] || {}));
      </pre><p>With this line:</p><pre class="ql-syntax" spellcheck="false">players.add(".playSingle" + i, (playerVarsList[i] || {}));
      </pre><p>Did not work.</p><p><strong>I just tried.</strong></p><p>It breaks button 3 when I do that:&nbsp;<a href="https://jsfiddle.net/vpjrsb9z/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/vpjrsb9z/</a></p><p>No video appears at all when button 3 is clicked.</p><p>Maybe almost fixed?</p><p>The 1st video isn't being selected anymore, that is good.</p><pre class="ql-syntax" spellcheck="false"><a href="https://i.stack.imgur.com/8YU3e.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/8YU3e.png" alt="enter image description here"></a>
      </pre>`,
      vote_result: 0,
      views: 0,
      created_time: '2022. 12. 22. 오전 11:30:23',
      modified_time: '2022. 12. 22. 오전 11:30:23',
      tags: ['javascript', 'html', 'css', 'arrays', 'debugging'],
    },
    {
      question_id: 2,
      username: 'human_001',
      title: 'What are the chances of Random.NextDouble being exactly 0?',
      image:
        'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
      text: `<p>The documentation of&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">Random.NextDouble()</code>:</p><blockquote>Returns a random floating-point number that is greater than or equal to 0.0, and less than 1.0.</blockquote><p>So, it can be exactly 0. But what are the chances for that?</p><pre class="ql-syntax" spellcheck="false">var random = new Random();
      var x = random.NextDouble()
      if(x == 0){
          // probability for this?
      }
      </pre><p>It would be easy to calculate the probability for&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">Random.Next()</code>&nbsp;being 0, but I have no idea how to do it in this case...</p><p><br></p><pre class="ql-syntax" spellcheck="false">
      </pre>`,
      vote_result: 0,
      views: 0,
      created_time: '2022. 12. 22. 오전 11:30:23',
      modified_time: '2022. 12. 22. 오전 11:30:23',
      tags: ['c#', '.net', 'random'],
    },
    {
      question_id: 3,
      username: 'human_001',
      title: 'base64Decode removes pages from a pdf in base64?',
      image:
        'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
      text: `<p>I am using dio package to make a GET request to a server to retrieve a PDF file.</p><p>The request is working fine, I get the PDF in base64.</p><p><a href="https://i.stack.imgur.com/8OyLz.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/8OyLz.png" alt="base 64 retrieved ok"></a></p><p>I get the response.data, and I use base64Decode to get the Uint8List, I save the file in the storage.</p><pre class="ql-syntax" spellcheck="false">    class FileSaverHelper {
    
      Future&lt;String&gt; save({required String filename, required Uint8List bytes}) async {
    
        final String tempDir = (await getTemporaryDirectory()).path;
        final filePath = "$tempDir/$filename";
        await File(filePath).writeAsBytes(bytes);
    
        return filePath;
    
      }
    
    }
    
    class OpenFileHelper {
    
      final FileSaverHelper fileSaverHelper = Get.find();
    
      Future&lt;void&gt; open({
        required String filename,
        required Future&lt;Uint8List&gt; Function() onDownload
      }) async {
    
        final Uint8List bytes = await onDownload();
        final filePath = await fileSaverHelper.save(
            filename: filename,
            bytes: bytes
        );
    
        if(await File(filePath).exists()){
          OpenFilex.open(filePath);
        }
        
      }

}
</pre><p>When I open the PDF it has only the first page and when I test the base64 that the server sends in the site&nbsp;<a href="https://www.stackoverflow.com/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">Base64 to PDF</a>, the PDF decoded has the amount of pages correctly (which is two).</p><p><a href="https://i.stack.imgur.com/qgG16.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/qgG16.png" alt="the PDF has two pages after decoding"></a></p><p>Why after I use base64Decode(response.data), save the PDF to the storage, open it, it has only the first page but in the site the amount of pages is correct?</p>`,
      vote_result: 0,
      views: 0,
      created_time: '2022. 12. 22. 오전 11:30:23',
      modified_time: '2022. 12. 22. 오전 11:30:23',
      tags: ['flutter', 'dart', 'pdf', 'base64', 'uint8list'],
    },
    {
      question_id: 4,
      username: 'human_001',
      title: 'PHP - Returning the last line in a file?',
      image:
        'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
      text: `I'm guessing it's fgets, but I can't find the specific syntax. I'm trying to read out (in a string I'm thinking is easier) the last line added to a log file.`,
      vote_result: 0,
      views: 0,
      created_time: '2022. 12. 22. 오전 11:30:23',
      modified_time: '2022. 12. 22. 오전 11:30:23',
      tags: ['php', 'syntax', 'fread', 'fgets'],
    },
    {
      question_id: 5,
      username: 'human_001',
      title: 'Moving from a normal bar chart to a stacked bar on dygraphs',
      image:
        'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
      text: `<p>I've got an xts df of the following format:</p><pre class="ql-syntax" spellcheck="false">structure(c("May 2022", "Jun 2022", "Jul 2022", "Aug 2022", "Sep 2022", 
      "Oct 2022", "Nov 2022", "Dec 2022", " 3035.199", " 5500.000", 
      "11568.750", " 2510.000", " 6999.999", "21792.149", " 9750.000", 
      " 5624.999", " 2250.000", " 4136.975", " 6525.500", " 2771.875", 
      " 4637.500", "16273.499", " 6000.000", " 4494.649", " 2500.000", 
      "    0.000", " 3029.000", " 2803.500", "    0.000", "14481.250", 
      " 4374.998", " 4062.498", "    0.000", " 3075.000", " 6939.249", 
      " 1500.000", " 4183.157", " 5769.000", " 3559.500", " 3250.000"
      ), class = c("xts", "zoo"), index = structure(c(1651363200, 1654041600, 
      1656633600, 1659312000, 1661990400, 1664582400, 1667260800, 1669852800
      ), tzone = "UTC", tclass = "yearmon"), .Dim = c(8L, 5L), .Dimnames = list(
          NULL, c("Month", "Cat 1", "Cat 2", "Cat 3", "Cat 4")))
      </pre><p>I'm trying to create a stacked bar chart using the dygraphs library.</p><pre class="ql-syntax" spellcheck="false">library(dygraphs)
      library(lubridate)
      today &lt;- as.Date(Sys.time())
          last_6 &lt;- today+months(-6)
              dygraph(df) %&gt;%
                dyAxis("y", label= "Total") %&gt;%
                dyRangeSelector(dateWindow = c(last_6, today)) %&gt;%
                dyMultiColumnGroup(c("Cat 1", "Cat 2", "Cat 3", "Cat 4"))
      </pre><p>This produce a bar chart that looks like this:<a href="https://i.stack.imgur.com/0M97H.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/0M97H.png" alt="Current bar chart"></a></p><p>I was wondering if anyone had any advice on how to make stacked bar chart? Many of the guides talk about bringing in plotters, but unfortunately they are not detailed enough for me to properly understand what is going on.</p><p>Adding this:</p><pre class="ql-syntax" spellcheck="false">dyStackedBarGroup(c("Cat 1", "Cat 2", "Cat 3", "Cat 4"))
      </pre><p>instead of the dyMultiColumnGroup line leads to a:</p><pre class="ql-syntax" spellcheck="false">Error in cumulativeYval + points : non-numeric argument to binary operator
      </pre><p><br></p>`,
      vote_result: 0,
      views: 0,
      created_time: '2022. 12. 22. 오전 11:30:23',
      modified_time: '2022. 12. 22. 오전 11:30:23',
      tags: ['r', 'xls', 'dygraphs'],
    },
    {
      question_id: 6,
      username: 'human_001',
      title:
        'How do I modify this function to return a 4d array instead of 3d?',
      image:
        'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
      text: `<p>I created this function that takes in a&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">dataframe</code>&nbsp;to return an&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">ndarrays</code>&nbsp;of input and label.</p><pre class="ql-syntax" spellcheck="false">def transform_to_array(dataframe, chunk_size=100):
    
      grouped = dataframe.groupby('id')
  
      # initialize accumulators
      X, y = np.zeros([0, 1, chunk_size, 4]), np.zeros([0,]) # original inpt shape: [0, 1, chunk_size, 4]
  
      # loop over each group (df[df.id==1] and df[df.id==2])
      for _, group in grouped:
  
          inputs = group.loc[:, 'A':'D'].values 
          label = group.loc[:, 'label'].values[0]
  
          # calculate number of splits
          N = (len(inputs)-1) // chunk_size
  
          if N &gt; 0:
              inputs = np.array_split(
                   inputs, [chunk_size + (chunk_size*i) for i in range(N)])
          else:
              inputs = [inputs]
  
          # loop over splits
          for inpt in inputs:
              inpt = np.pad(
                  inpt, [(0, chunk_size-len(inpt)),(0, 0)], 
                  mode='constant')
              # add each inputs split to accumulators
              X = np.concatenate([X, inpt[np.newaxis, np.newaxis]], axis=0)
              y = np.concatenate([y, label[np.newaxis]], axis=0) 
  
      return X, y
  </pre><p>The function returned&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">X</code>&nbsp;of shape&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">(n_samples, 1, chunk_size, 4)</code>&nbsp;and&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">y</code>&nbsp;of shape&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">(n_samples, )</code>.</p><p>For examples:</p><pre class="ql-syntax" spellcheck="false">N = 10_000
  id = np.arange(N)
  labels = np.random.randint(5, size=N)
  df = pd.DataFrame(data = np.random.randn(N, 4),  columns=list('ABCD'))
  
  df['label'] = labels
  df.insert(0, 'id', id)
  df = df.loc[df.id.repeat(157)]
  
  df.head()
      id      A            B          C            D    label
  0   0   -0.571676   -0.337737   -0.019276   -1.377253   1
  0   0   -0.571676   -0.337737   -0.019276   -1.377253   1
  0   0   -0.571676   -0.337737   -0.019276   -1.377253   1
  0   0   -0.571676   -0.337737   -0.019276   -1.377253   1
  0   0   -0.571676   -0.337737   -0.019276   -1.377253   1
  </pre><p>To generate the followings:</p><pre class="ql-syntax" spellcheck="false">X, y = transform_to_array(df)
  
  X.shape   # shape of input
  (20000, 1, 100, 4)
  y.shape   # shape of label
  (20000,)
  </pre><p>This function works fine as intended, however, it takes long time to finish execution:</p><pre class="ql-syntax" spellcheck="false">start_time = time.time()
  X, y = transform_to_array(df)
  end_time = time.time()
  print(f'Time taken: {end_time - start_time} seconds.')
  Time taken: 227.83956217765808 seconds.
  </pre><p>In attempt to improve performance of the function (minimise exec. time), I created the following modified func:</p><pre class="ql-syntax" spellcheck="false">def modified_transform_to_array(dataframe, chunk_size=100):
      # group data by 'id'
      grouped = dataframe.groupby('id')
      # initialize lists to store transformed data
      X, y = [], []
  
      # loop over each group (df[df.id==1] and df[df.id==2])
      for _, group in grouped:
          # get input and label data for group
          inputs = group.loc[:, 'A':'D'].values 
          label = group.loc[:, 'label'].values[0]
  
          # calculate number of splits
          N = (len(inputs)-1) // chunk_size
  
          if N &gt; 0:
              # split input data into chunks
              inputs = np.array_split(
               inputs, [chunk_size + (chunk_size*i) for i in range(N)])
          else:
              inputs = [inputs]
  
          # loop over splits
          for inpt in inputs:
              # pad input data to have a chunk size of chunk_size
              inpt = np.pad(
              inpt, [(0, chunk_size-len(inpt)),(0, 0)], 
                  mode='constant')
              # add each input split and corresponding label to lists
              X.append(inpt)
              y.append(label)
  
      # convert lists to numpy arrays
      X = np.array(X)
      y = np.array(y)
  
      return X, y
  </pre><p>At first, it seems like I succeeded reducing time taken:</p><pre class="ql-syntax" spellcheck="false">start_time = time.time()
  X2, y2 = modified_transform_to_array(df)
  end_time = time.time()
  print(f'Time taken: {end_time - start_time} seconds.')
  Time taken: 5.842168092727661 seconds.
  </pre><p>However, the result is that it changes the shape of the intended returned value.</p><pre class="ql-syntax" spellcheck="false">X2.shape  # this should be (20000, 1, 100, 4)
  (20000, 100, 4)
  
  y.shape  # this is fine
  (20000, )
  </pre><p><strong>Question</strong></p><p>How do I modify&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">modified_transform_to_array()</code>&nbsp;to return the intended array shape&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">(n_samples, 1, chunk_size, 4)</code>&nbsp;since it is much faster?</p><p><br></p><p><br></p>`,
      vote_result: 0,
      views: 0,
      created_time: '2022. 12. 22. 오전 11:30:23',
      modified_time: '2022. 12. 22. 오전 11:30:23',
      tags: ['JavaScript', 'React', 'Redux'],
    },
    {
      question_id: 7,
      username: 'human_001',
      title:
        'Anchoring elements to both the top and bottom after they scroll off screen using pure CSS',
      image:
        'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
      text: `<p>I have a container that scrolls up and down vertically. Within the container there are some absolutely positioned items. Here is an example to illustrate.</p><pre class="ql-syntax" spellcheck="false">#body {
        height: 200px;
        overflow: scroll;
        font-family: sans-serif;
        font-size: 40px;
      }
      
      #container {
        width: 100%;
        height: 600px;
        background-color: rgba(255, 0, 0, 0.1);
        position: relative;
        display: flex;
        align-items: start;
        justify-content: center;
      }
      
      #item {
        display: inline;
        background-color: rgba(0, 0, 255, 0.1);
        padding: 10px 20px;
        border-radius: 5px;
        position: absolute;
        top: 150px;
      }
      &lt;div id="body"&gt;
        &lt;div id="container"&gt;
          &lt;div id="item"&gt;
            Hello
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      </pre><p>&nbsp;Run code snippet<span style="color: var(--theme-link-color);">Expand snippet</span></p><p>I want to make sure a little portion of the item is always visible as the user scrolls up and down, so that the user can always see something there, and doesn't lose track of it. When the user scrolls too far down, it should look like this...</p><p><a href="https://i.stack.imgur.com/EFEs4.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/EFEs4.png" alt="An image showing a small portion of the item at the top of the screen"></a></p><p>Conversely, if the user scrolls too far up, it should look like this...</p><p><a href="https://i.stack.imgur.com/s5XIU.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/s5XIU.png" alt="An image showing a small portion of the item at the bottom of the screen"></a></p><p><strong>It's also important that the element can be positioned anywhere in the container.</strong></p><pre class="ql-syntax" spellcheck="false">Is this possible with pure CSS? If this is not possible, what's the most efficient approach to achieving the same result with pure CSS &amp; JS (bearing in mind the container might have multiple items in it)?
      </pre>`,
      vote_result: 0,
      views: 0,
      created_time: '2022. 12. 22. 오전 11:30:23',
      modified_time: '2022. 12. 22. 오전 11:30:23',
      tags: ['JavaScript', 'css', 'position'],
    },
    {
      question_id: 8,
      username: 'human_001',
      title: 'sample title',
      image:
        'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
      text: 'sample question content',
      vote_result: 0,
      views: 0,
      created_time: '2022. 12. 22. 오전 11:30:23',
      modified_time: '2022. 12. 22. 오전 11:30:23',
      tags: ['JavaScript', 'React', 'Git', 'Github'],
    },
    {
      question_id: 9,
      username: 'human_001',
      title: 'sample title',
      image:
        'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
      text: 'sample question content',
      vote_result: 0,
      views: 0,
      created_time: '2022. 12. 22. 오전 11:30:23',
      modified_time: '2022. 12. 22. 오전 11:30:23',
      tags: ['JavaScript', 'React', 'Firebase'],
    },
    {
      question_id: 10,
      username: 'human_001',
      title: 'sample title',
      image:
        'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
      text: 'sample question content',
      vote_result: 0,
      views: 0,
      created_time: '2022. 12. 22. 오전 11:30:23',
      modified_time: '2022. 12. 22. 오전 11:30:23',
      tags: ['JavaScript', 'React', 'ReactQuill'],
    },
    {
      question_id: 11,
      username: 'human_001',
      title: 'sample title',
      image:
        'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
      text: 'sample question content',
      vote_result: 0,
      views: 0,
      created_time: '2022. 12. 22. 오전 11:30:23',
      modified_time: '2022. 12. 22. 오전 11:30:23',
      tags: ['JavaScript', 'React', 'Redux'],
    },
    {
      question_id: 12,
      username: 'human_001',
      title: 'sample title',
      image:
        'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
      text: 'sample question content',
      vote_result: 0,
      views: 0,
      created_time: '2022. 12. 22. 오전 11:30:23',
      modified_time: '2022. 12. 22. 오전 11:30:23',
      tags: ['JavaScript', 'React', 'Redux'],
    },
    {
      question_id: 13,
      username: 'human_001',
      title: 'sample title',
      image:
        'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
      text: 'sample question content',
      vote_result: 0,
      views: 0,
      created_time: '2022. 12. 22. 오전 11:30:23',
      modified_time: '2022. 12. 22. 오전 11:30:23',
      tags: ['Stackoverflow'],
    },
    {
      question_id: 14,
      username: 'human_001',
      title: 'sample title',
      image:
        'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
      text: 'sample question content',
      vote_result: 0,
      views: 0,
      created_time: '2022. 12. 22. 오전 11:30:23',
      modified_time: '2022. 12. 22. 오전 11:30:23',
      tags: ['Stackoverflow', 'Github'],
    },
  ],
  member: [
    {
      memberId: 3,
      email: 'human@gmail.com',
      username: 'human_001',
      created_time: '2022. 12. 22. 오전 11:30:23',
      modified_time: '2022. 12. 22. 오전 11:30:23',
      aboutMe: '안녕하세요 저는 휴먼입니다',
      image:
        'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
      answers: [
        {
          answer_id: 0,
          answer_content: `<p>The problem happens because in your source code, there are&nbsp;<strong>multiple divs with the class "video"</strong>. The code uses a div with the class "video" to transfer the video id from the button to the actual video player.</p><p>Because there are multiple divs with the class video this doesn't work.</p><p>One workaround would be to just delete your first div block with class "play2" and everything contained in that div. However, you are probably going to want to be able to have multiple independent instances of the video player setup on the same page, so we need to fix the code so that the correct div with class "Video" is used.</p><p>For that change the implementation of the click event handler for the buttons.</p><p>From:</p><pre class="ql-syntax" spellcheck="false">const myVideo = document.querySelector('.video');

            document.querySelectorAll('button.cover').forEach(function(button) {
              button.addEventListener('click', function(event) {
                myVideo.dataset.id = event.currentTarget.dataset.id;
              });
            });
            </pre><p>To:</p><pre class="ql-syntax" spellcheck="false">document.querySelectorAll('button.cover').forEach(function(button) {
              button.addEventListener('click', function(event) {
                let container=event.currentTarget.dataset.container;
                let myVideo = document.querySelector('.' + container + ' .video');
                myVideo.dataset.id = event.currentTarget.dataset.id;
              });
            });
            </pre><p>We first get the "container" from the button that was clicked. Then we search for a div with class "video" that is inside another div with that container class.</p><p>Note that you don't need the global&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">myvideo</code>&nbsp;variable anymore.</p><p>Also change the code in&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">onYouTubeIframeAPIReady</code>&nbsp;to its original state:</p><pre class="ql-syntax" spellcheck="false">//to add the player to all the play buttons
            let totalPlayButtons = document.querySelectorAll('[data-container="play1"]').length;
            
            //looping over all the play buttons and adding player to that
            for (let i = 0; i &lt; totalPlayButtons; i++) {
                    players.add(".playSingle" + i, (playerVarsList[i] || {}));
            }
            players.add(".playInitial", {});
            Also, there is a bug with your exit button logic, but that is outside the scope of this question. Please ask another question if you are having problems there.
            </pre>`,
        },
        {
          answer_id: 1,
          answer_content: `<p>There are couple of places where array index is out of bound, that’s why it is not working.</p><p>Changes in&nbsp;<strong>onYouTubeIframeAPIReady()</strong>&nbsp;function:</p><pre class="ql-syntax" spellcheck="false">function onYouTubeIframeAPIReady() {
            let playerVarsList = {
              0: {
                playerVars: {
                  playlist: "0dgNc5S8cLI,mnfmQe8Mv1g,-Xgi_way56U,CHahce95B1g"
                }
              },
              1: {
                playerVars: {
                  listType: "playlist",
                  list: "PLYeOyMz9C9kYmnPHfw5-ItOxYBiMG4amq"
                }
              }
            }
           //to add the player to all the play buttons
            let totalPlayButtons = document.querySelectorAll('[data-container="play1"]').length;
          
             //looping over all the play buttons and adding player to that
            for (let i = 0; i &lt; totalPlayButtons; i++) {
              players.add(".playSingle" + i, (playerVarsList[i%(Object.keys(playerVarsList).length)] || {}));
            }
            players.add(".playInitial", {});
          }
          </pre><p>Changes in&nbsp;<strong>findPlayers()</strong>&nbsp;function</p><pre class="ql-syntax" spellcheck="false">function findPlayers() {
              const allCovers = document.querySelectorAll(".cover");
              const allWrappers = document.querySelectorAll(".wrap");
              allCovers.forEach(function addToPlayers(cover, index) {
                players.push({
                  "cover": cover,
                  "wrapper": (index&lt;allWrappers.length)?allWrappers[index]:allWrappers[allWrappers.length-1]
                });
              });
            }
          
          </pre>`,
        },
        {
          answer_id: 2,
          answer_content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...',
        },
      ],
      questions: [
        {
          question_id: 5,
          username: 'human_001',
          title: 'Moving from a normal bar chart to a stacked bar on dygraphs',
          image:
            'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
          text: `<p>I've got an xts df of the following format:</p><pre class="ql-syntax" spellcheck="false">structure(c("May 2022", "Jun 2022", "Jul 2022", "Aug 2022", "Sep 2022", 
          "Oct 2022", "Nov 2022", "Dec 2022", " 3035.199", " 5500.000", 
          "11568.750", " 2510.000", " 6999.999", "21792.149", " 9750.000", 
          " 5624.999", " 2250.000", " 4136.975", " 6525.500", " 2771.875", 
          " 4637.500", "16273.499", " 6000.000", " 4494.649", " 2500.000", 
          "    0.000", " 3029.000", " 2803.500", "    0.000", "14481.250", 
          " 4374.998", " 4062.498", "    0.000", " 3075.000", " 6939.249", 
          " 1500.000", " 4183.157", " 5769.000", " 3559.500", " 3250.000"
          ), class = c("xts", "zoo"), index = structure(c(1651363200, 1654041600, 
          1656633600, 1659312000, 1661990400, 1664582400, 1667260800, 1669852800
          ), tzone = "UTC", tclass = "yearmon"), .Dim = c(8L, 5L), .Dimnames = list(
              NULL, c("Month", "Cat 1", "Cat 2", "Cat 3", "Cat 4")))
          </pre><p>I'm trying to create a stacked bar chart using the dygraphs library.</p><pre class="ql-syntax" spellcheck="false">library(dygraphs)
          library(lubridate)
          today &lt;- as.Date(Sys.time())
              last_6 &lt;- today+months(-6)
                  dygraph(df) %&gt;%
                    dyAxis("y", label= "Total") %&gt;%
                    dyRangeSelector(dateWindow = c(last_6, today)) %&gt;%
                    dyMultiColumnGroup(c("Cat 1", "Cat 2", "Cat 3", "Cat 4"))
          </pre><p>This produce a bar chart that looks like this:<a href="https://i.stack.imgur.com/0M97H.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/0M97H.png" alt="Current bar chart"></a></p><p>I was wondering if anyone had any advice on how to make stacked bar chart? Many of the guides talk about bringing in plotters, but unfortunately they are not detailed enough for me to properly understand what is going on.</p><p>Adding this:</p><pre class="ql-syntax" spellcheck="false">dyStackedBarGroup(c("Cat 1", "Cat 2", "Cat 3", "Cat 4"))
          </pre><p>instead of the dyMultiColumnGroup line leads to a:</p><pre class="ql-syntax" spellcheck="false">Error in cumulativeYval + points : non-numeric argument to binary operator
          </pre><p><br></p>`,
          vote_result: 0,
          views: 0,
          created_time: '2022. 12. 22. 오전 11:30:23',
          modified_time: '2022. 12. 22. 오전 11:30:23',
          tags: ['r', 'xls', 'dygraphs'],
        },
        {
          question_id: 1,
          username: 'human_001',
          title: 'Correct video not playing when button 3 is clicked',
          image:
            'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
          text: `<p>How would this be debugged and fixed?</p><p>I am finding the code incredibly difficult to debug.</p><p>How would this issue be fixed in the code?</p><p>I want the code to work how it works in the&nbsp;<strong>demo code</strong>:&nbsp;<a href="https://jsfiddle.net/awht6u37/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/awht6u37/</a></p><p>Where this&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">data-id</code>&nbsp;works:</p><pre class="ql-syntax" spellcheck="false">&lt;button class="playSingle2 cover" type="button" data-container="play1" data-id="-Xgi_way56U"&gt;&lt;/button&gt;
          </pre><p>How do I fix the problem that is in the code presently&nbsp;<strong>after adding</strong>&nbsp;the&nbsp;<strong>answer code</strong>&nbsp;that was&nbsp;<strong>given below</strong>?</p><p>Where the behavior in the demo code:&nbsp;<a href="https://jsfiddle.net/awht6u37/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/awht6u37/</a></p><p>The correct video appears here when clicking on&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">&lt;button&gt;</code>&nbsp;<strong>#3</strong>.</p><pre class="ql-syntax" spellcheck="false">&lt;div class="playButtonContainer with-curtain "&gt;
            &lt;button class="playSingle0 cover" data-container="play1"&gt;&lt;/button&gt;
            &lt;button class="playSingle1 cover" data-container="play1"&gt;&lt;/button&gt;
            &lt;button class="playSingle2 cover" data-container="play1" data-id="-Xgi_way56U"&gt;&lt;/button&gt;
          &lt;/div&gt;
          
          function findPlayers() {
              const buttons = document.querySelectorAll(".cover");
              const wrapper = document.querySelector(".wrap");
              buttons.forEach(function addToPlayers(button) {
                players.push({
                  "cover": button,
                  "wrapper": wrapper
                });
              });
            }
          
          for (let i = 0; i &lt; 3; i++) {
              players.add(".playSingle" + i, (playerVarsList[i] || {}));
            }
          </pre><p><strong>Should work the same way</strong>&nbsp;as&nbsp;<strong>this code</strong>&nbsp;here with 3 buttons that is written differently.&nbsp;<a href="https://jsfiddle.net/7xz6gw1b/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/7xz6gw1b/</a></p><p>What in here would need to be written differently?</p><pre class="ql-syntax" spellcheck="false">function findPlayers() {
              const allCovers = document.querySelectorAll(".cover");
              const allWrappers = document.querySelectorAll(".wrap");
              allCovers.forEach(function addToPlayers(cover, index) {
                players.push({
                  "cover": cover,
                  "wrapper": (index &lt; allWrappers.length) ? allWrappers[index] : allWrappers[allWrappers.length - 1]
                });
              });
            }
          
          //to add the player to all the play buttons
            let totalPlayButtons = document.querySelectorAll('[data-container="play1"]').length;
          
            //looping over all the play buttons and adding player to that
            for (let i = 0; i &lt; totalPlayButtons; i++) {
              players.add(".playSingle" + i, (playerVarsList[i % (Object.keys(playerVarsList).length)] || {}));
            }
          </pre><p>Where in the demo code clicking on&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">&lt;button&gt;</code>&nbsp;<strong>#3</strong>&nbsp;that has no playlist given to it, instead plays the video from its&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">data-id=""</code></p><p><a href="https://i.stack.imgur.com/FkQB1.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/FkQB1.png" alt="enter image description here"></a></p><p><strong>To reproduce the issue:</strong></p><p>Here is the code with&nbsp;<strong>3</strong>&nbsp;buttons I am right now working on:&nbsp;<a href="https://jsfiddle.net/3htaxrse/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/3htaxrse/</a></p><p>When I click on&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">&lt;button&gt;</code>&nbsp;<strong>#3</strong></p><p><a href="https://i.stack.imgur.com/n22Nd.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/n22Nd.png" alt="enter image description here"></a></p><p>I am shown video from&nbsp;<strong>#1</strong></p><pre class="ql-syntax" spellcheck="false">0: {
                playerVars: {
                  playlist: "0dgNc5S8cLI,mnfmQe8Mv1g,-Xgi_way56U,CHahce95B1g"
                }
              }, // Button 1
          </pre><p><a href="https://i.stack.imgur.com/5yRSE.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/5yRSE.png" alt="enter image description here"></a></p><p>Instead this is the video that should be seen.&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">data-id="-Xgi_way56U"</code></p><p><a href="https://i.stack.imgur.com/KAWln.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/KAWln.png" alt="enter image description here"></a></p><pre class="ql-syntax" spellcheck="false">&lt;div class="playButtonContainer with-curtain "&gt;
            &lt;button class="playSingle0 cover" data-container="play1"&gt;&lt;/button&gt;
            &lt;button class="playSingle1 cover" data-container="play1"&gt;&lt;/button&gt;
            &lt;button class="playSingle2 cover" data-container="play1" data-id="-Xgi_way56U"&gt;&lt;/button&gt;
          &lt;/div&gt;
          </pre><p>That is the problem I am trying to fix in the code I am working on.</p><p>How would the code with&nbsp;<strong>3 buttons</strong>&nbsp;that I am working on be adjusted so that, the&nbsp;<strong>correct</strong>&nbsp;video plays?&nbsp;<a href="https://jsfiddle.net/7xz6gw1b/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/7xz6gw1b/</a></p><p>Is there a way to look at how the&nbsp;<strong>demo code</strong>&nbsp;is&nbsp;<strong>written</strong>, to be able to make the appropriate changes in the&nbsp;<strong>other code</strong>?</p><p><a href="https://jsfiddle.net/7xz6gw1b/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/7xz6gw1b/</a></p><p>Because in the demo code it works as it should.</p><p><strong>Demo Code</strong>:&nbsp;<a href="https://jsfiddle.net/awht6u37/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/awht6u37/</a></p><p>Is looking at the&nbsp;<strong>demo code</strong>&nbsp;helpful at all?</p><p>Because it works in there.</p><p><strong>An attempt at fixing:</strong></p><p>Replacing this line:</p><pre class="ql-syntax" spellcheck="false">players.add(".playSingle" + i, (playerVarsList[i % (Object.keys(playerVarsList).length)] || {}));
          </pre><p>With this line:</p><pre class="ql-syntax" spellcheck="false">players.add(".playSingle" + i, (playerVarsList[i] || {}));
          </pre><p>Did not work.</p><p><strong>I just tried.</strong></p><p>It breaks button 3 when I do that:&nbsp;<a href="https://jsfiddle.net/vpjrsb9z/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/vpjrsb9z/</a></p><p>No video appears at all when button 3 is clicked.</p><p>Maybe almost fixed?</p><p>The 1st video isn't being selected anymore, that is good.</p><pre class="ql-syntax" spellcheck="false"><a href="https://i.stack.imgur.com/8YU3e.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/8YU3e.png" alt="enter image description here"></a>
          </pre>`,
          vote_result: 0,
          views: 0,
          created_time: '2022. 12. 22. 오전 11:30:23',
          modified_time: '2022. 12. 22. 오전 11:30:23',
          tags: ['javascript', 'html', 'css', 'arrays', 'debugging'],
        },
      ],
    },
    {
      memberId: 1,
      email: 'human@gmail.com',
      username: 'human_001',
      created_time: '2022. 12. 22. 오전 11:30:23',
      modified_time: '2022. 12. 22. 오전 11:30:23',
      aboutMe: '안녕하세요 저는 휴먼입니다',
      image:
        'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
      answers: [
        {
          answer_id: 0,
          answer_content: `<p>The problem happens because in your source code, there are&nbsp;<strong>multiple divs with the class "video"</strong>. The code uses a div with the class "video" to transfer the video id from the button to the actual video player.</p><p>Because there are multiple divs with the class video this doesn't work.</p><p>One workaround would be to just delete your first div block with class "play2" and everything contained in that div. However, you are probably going to want to be able to have multiple independent instances of the video player setup on the same page, so we need to fix the code so that the correct div with class "Video" is used.</p><p>For that change the implementation of the click event handler for the buttons.</p><p>From:</p><pre class="ql-syntax" spellcheck="false">const myVideo = document.querySelector('.video');

            document.querySelectorAll('button.cover').forEach(function(button) {
              button.addEventListener('click', function(event) {
                myVideo.dataset.id = event.currentTarget.dataset.id;
              });
            });
            </pre><p>To:</p><pre class="ql-syntax" spellcheck="false">document.querySelectorAll('button.cover').forEach(function(button) {
              button.addEventListener('click', function(event) {
                let container=event.currentTarget.dataset.container;
                let myVideo = document.querySelector('.' + container + ' .video');
                myVideo.dataset.id = event.currentTarget.dataset.id;
              });
            });
            </pre><p>We first get the "container" from the button that was clicked. Then we search for a div with class "video" that is inside another div with that container class.</p><p>Note that you don't need the global&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">myvideo</code>&nbsp;variable anymore.</p><p>Also change the code in&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">onYouTubeIframeAPIReady</code>&nbsp;to its original state:</p><pre class="ql-syntax" spellcheck="false">//to add the player to all the play buttons
            let totalPlayButtons = document.querySelectorAll('[data-container="play1"]').length;
            
            //looping over all the play buttons and adding player to that
            for (let i = 0; i &lt; totalPlayButtons; i++) {
                    players.add(".playSingle" + i, (playerVarsList[i] || {}));
            }
            players.add(".playInitial", {});
            Also, there is a bug with your exit button logic, but that is outside the scope of this question. Please ask another question if you are having problems there.
            </pre>`,
        },
        {
          answer_id: 1,
          answer_content: `<p>There are couple of places where array index is out of bound, that’s why it is not working.</p><p>Changes in&nbsp;<strong>onYouTubeIframeAPIReady()</strong>&nbsp;function:</p><pre class="ql-syntax" spellcheck="false">function onYouTubeIframeAPIReady() {
            let playerVarsList = {
              0: {
                playerVars: {
                  playlist: "0dgNc5S8cLI,mnfmQe8Mv1g,-Xgi_way56U,CHahce95B1g"
                }
              },
              1: {
                playerVars: {
                  listType: "playlist",
                  list: "PLYeOyMz9C9kYmnPHfw5-ItOxYBiMG4amq"
                }
              }
            }
           //to add the player to all the play buttons
            let totalPlayButtons = document.querySelectorAll('[data-container="play1"]').length;
          
             //looping over all the play buttons and adding player to that
            for (let i = 0; i &lt; totalPlayButtons; i++) {
              players.add(".playSingle" + i, (playerVarsList[i%(Object.keys(playerVarsList).length)] || {}));
            }
            players.add(".playInitial", {});
          }
          </pre><p>Changes in&nbsp;<strong>findPlayers()</strong>&nbsp;function</p><pre class="ql-syntax" spellcheck="false">function findPlayers() {
              const allCovers = document.querySelectorAll(".cover");
              const allWrappers = document.querySelectorAll(".wrap");
              allCovers.forEach(function addToPlayers(cover, index) {
                players.push({
                  "cover": cover,
                  "wrapper": (index&lt;allWrappers.length)?allWrappers[index]:allWrappers[allWrappers.length-1]
                });
              });
            }
          
          </pre>`,
        },
        {
          answer_id: 2,
          answer_content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...',
        },
      ],
      questions: [
        {
          question_id: 5,
          username: 'human_001',
          title: 'Moving from a normal bar chart to a stacked bar on dygraphs',
          image:
            'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
          text: `<p>I've got an xts df of the following format:</p><pre class="ql-syntax" spellcheck="false">structure(c("May 2022", "Jun 2022", "Jul 2022", "Aug 2022", "Sep 2022", 
          "Oct 2022", "Nov 2022", "Dec 2022", " 3035.199", " 5500.000", 
          "11568.750", " 2510.000", " 6999.999", "21792.149", " 9750.000", 
          " 5624.999", " 2250.000", " 4136.975", " 6525.500", " 2771.875", 
          " 4637.500", "16273.499", " 6000.000", " 4494.649", " 2500.000", 
          "    0.000", " 3029.000", " 2803.500", "    0.000", "14481.250", 
          " 4374.998", " 4062.498", "    0.000", " 3075.000", " 6939.249", 
          " 1500.000", " 4183.157", " 5769.000", " 3559.500", " 3250.000"
          ), class = c("xts", "zoo"), index = structure(c(1651363200, 1654041600, 
          1656633600, 1659312000, 1661990400, 1664582400, 1667260800, 1669852800
          ), tzone = "UTC", tclass = "yearmon"), .Dim = c(8L, 5L), .Dimnames = list(
              NULL, c("Month", "Cat 1", "Cat 2", "Cat 3", "Cat 4")))
          </pre><p>I'm trying to create a stacked bar chart using the dygraphs library.</p><pre class="ql-syntax" spellcheck="false">library(dygraphs)
          library(lubridate)
          today &lt;- as.Date(Sys.time())
              last_6 &lt;- today+months(-6)
                  dygraph(df) %&gt;%
                    dyAxis("y", label= "Total") %&gt;%
                    dyRangeSelector(dateWindow = c(last_6, today)) %&gt;%
                    dyMultiColumnGroup(c("Cat 1", "Cat 2", "Cat 3", "Cat 4"))
          </pre><p>This produce a bar chart that looks like this:<a href="https://i.stack.imgur.com/0M97H.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/0M97H.png" alt="Current bar chart"></a></p><p>I was wondering if anyone had any advice on how to make stacked bar chart? Many of the guides talk about bringing in plotters, but unfortunately they are not detailed enough for me to properly understand what is going on.</p><p>Adding this:</p><pre class="ql-syntax" spellcheck="false">dyStackedBarGroup(c("Cat 1", "Cat 2", "Cat 3", "Cat 4"))
          </pre><p>instead of the dyMultiColumnGroup line leads to a:</p><pre class="ql-syntax" spellcheck="false">Error in cumulativeYval + points : non-numeric argument to binary operator
          </pre><p><br></p>`,
          vote_result: 0,
          views: 0,
          created_time: '2022. 12. 22. 오전 11:30:23',
          modified_time: '2022. 12. 22. 오전 11:30:23',
          tags: ['r', 'xls', 'dygraphs'],
        },
        {
          question_id: 1,
          username: 'human_001',
          title: 'Correct video not playing when button 3 is clicked',
          image:
            'https://meloncoffee.com/wp-content/uploads/2020/11/hamster-690108_1280.jpg',
          text: `<p>How would this be debugged and fixed?</p><p>I am finding the code incredibly difficult to debug.</p><p>How would this issue be fixed in the code?</p><p>I want the code to work how it works in the&nbsp;<strong>demo code</strong>:&nbsp;<a href="https://jsfiddle.net/awht6u37/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/awht6u37/</a></p><p>Where this&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">data-id</code>&nbsp;works:</p><pre class="ql-syntax" spellcheck="false">&lt;button class="playSingle2 cover" type="button" data-container="play1" data-id="-Xgi_way56U"&gt;&lt;/button&gt;
          </pre><p>How do I fix the problem that is in the code presently&nbsp;<strong>after adding</strong>&nbsp;the&nbsp;<strong>answer code</strong>&nbsp;that was&nbsp;<strong>given below</strong>?</p><p>Where the behavior in the demo code:&nbsp;<a href="https://jsfiddle.net/awht6u37/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/awht6u37/</a></p><p>The correct video appears here when clicking on&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">&lt;button&gt;</code>&nbsp;<strong>#3</strong>.</p><pre class="ql-syntax" spellcheck="false">&lt;div class="playButtonContainer with-curtain "&gt;
            &lt;button class="playSingle0 cover" data-container="play1"&gt;&lt;/button&gt;
            &lt;button class="playSingle1 cover" data-container="play1"&gt;&lt;/button&gt;
            &lt;button class="playSingle2 cover" data-container="play1" data-id="-Xgi_way56U"&gt;&lt;/button&gt;
          &lt;/div&gt;
          
          function findPlayers() {
              const buttons = document.querySelectorAll(".cover");
              const wrapper = document.querySelector(".wrap");
              buttons.forEach(function addToPlayers(button) {
                players.push({
                  "cover": button,
                  "wrapper": wrapper
                });
              });
            }
          
          for (let i = 0; i &lt; 3; i++) {
              players.add(".playSingle" + i, (playerVarsList[i] || {}));
            }
          </pre><p><strong>Should work the same way</strong>&nbsp;as&nbsp;<strong>this code</strong>&nbsp;here with 3 buttons that is written differently.&nbsp;<a href="https://jsfiddle.net/7xz6gw1b/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/7xz6gw1b/</a></p><p>What in here would need to be written differently?</p><pre class="ql-syntax" spellcheck="false">function findPlayers() {
              const allCovers = document.querySelectorAll(".cover");
              const allWrappers = document.querySelectorAll(".wrap");
              allCovers.forEach(function addToPlayers(cover, index) {
                players.push({
                  "cover": cover,
                  "wrapper": (index &lt; allWrappers.length) ? allWrappers[index] : allWrappers[allWrappers.length - 1]
                });
              });
            }
          
          //to add the player to all the play buttons
            let totalPlayButtons = document.querySelectorAll('[data-container="play1"]').length;
          
            //looping over all the play buttons and adding player to that
            for (let i = 0; i &lt; totalPlayButtons; i++) {
              players.add(".playSingle" + i, (playerVarsList[i % (Object.keys(playerVarsList).length)] || {}));
            }
          </pre><p>Where in the demo code clicking on&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">&lt;button&gt;</code>&nbsp;<strong>#3</strong>&nbsp;that has no playlist given to it, instead plays the video from its&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">data-id=""</code></p><p><a href="https://i.stack.imgur.com/FkQB1.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/FkQB1.png" alt="enter image description here"></a></p><p><strong>To reproduce the issue:</strong></p><p>Here is the code with&nbsp;<strong>3</strong>&nbsp;buttons I am right now working on:&nbsp;<a href="https://jsfiddle.net/3htaxrse/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/3htaxrse/</a></p><p>When I click on&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">&lt;button&gt;</code>&nbsp;<strong>#3</strong></p><p><a href="https://i.stack.imgur.com/n22Nd.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/n22Nd.png" alt="enter image description here"></a></p><p>I am shown video from&nbsp;<strong>#1</strong></p><pre class="ql-syntax" spellcheck="false">0: {
                playerVars: {
                  playlist: "0dgNc5S8cLI,mnfmQe8Mv1g,-Xgi_way56U,CHahce95B1g"
                }
              }, // Button 1
          </pre><p><a href="https://i.stack.imgur.com/5yRSE.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/5yRSE.png" alt="enter image description here"></a></p><p>Instead this is the video that should be seen.&nbsp;<code style="color: var(--black-800); background-color: var(--black-075);">data-id="-Xgi_way56U"</code></p><p><a href="https://i.stack.imgur.com/KAWln.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/KAWln.png" alt="enter image description here"></a></p><pre class="ql-syntax" spellcheck="false">&lt;div class="playButtonContainer with-curtain "&gt;
            &lt;button class="playSingle0 cover" data-container="play1"&gt;&lt;/button&gt;
            &lt;button class="playSingle1 cover" data-container="play1"&gt;&lt;/button&gt;
            &lt;button class="playSingle2 cover" data-container="play1" data-id="-Xgi_way56U"&gt;&lt;/button&gt;
          &lt;/div&gt;
          </pre><p>That is the problem I am trying to fix in the code I am working on.</p><p>How would the code with&nbsp;<strong>3 buttons</strong>&nbsp;that I am working on be adjusted so that, the&nbsp;<strong>correct</strong>&nbsp;video plays?&nbsp;<a href="https://jsfiddle.net/7xz6gw1b/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/7xz6gw1b/</a></p><p>Is there a way to look at how the&nbsp;<strong>demo code</strong>&nbsp;is&nbsp;<strong>written</strong>, to be able to make the appropriate changes in the&nbsp;<strong>other code</strong>?</p><p><a href="https://jsfiddle.net/7xz6gw1b/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/7xz6gw1b/</a></p><p>Because in the demo code it works as it should.</p><p><strong>Demo Code</strong>:&nbsp;<a href="https://jsfiddle.net/awht6u37/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/awht6u37/</a></p><p>Is looking at the&nbsp;<strong>demo code</strong>&nbsp;helpful at all?</p><p>Because it works in there.</p><p><strong>An attempt at fixing:</strong></p><p>Replacing this line:</p><pre class="ql-syntax" spellcheck="false">players.add(".playSingle" + i, (playerVarsList[i % (Object.keys(playerVarsList).length)] || {}));
          </pre><p>With this line:</p><pre class="ql-syntax" spellcheck="false">players.add(".playSingle" + i, (playerVarsList[i] || {}));
          </pre><p>Did not work.</p><p><strong>I just tried.</strong></p><p>It breaks button 3 when I do that:&nbsp;<a href="https://jsfiddle.net/vpjrsb9z/" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);">https://jsfiddle.net/vpjrsb9z/</a></p><p>No video appears at all when button 3 is clicked.</p><p>Maybe almost fixed?</p><p>The 1st video isn't being selected anymore, that is good.</p><pre class="ql-syntax" spellcheck="false"><a href="https://i.stack.imgur.com/8YU3e.png" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><img src="https://i.stack.imgur.com/8YU3e.png" alt="enter image description here"></a>
          </pre>`,
          vote_result: 0,
          views: 0,
          created_time: '2022. 12. 22. 오전 11:30:23',
          modified_time: '2022. 12. 22. 오전 11:30:23',
          tags: ['javascript', 'html', 'css', 'arrays', 'debugging'],
        },
      ],
    },
  ],

  comments: [
    {
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...',
      username: 'human_001',
    },
    {
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...',
      username: 'human_001',
    },
    {
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...',
      username: 'human_001',
    },
  ],
};
