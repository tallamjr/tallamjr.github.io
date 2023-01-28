---
template: main.html
description: >
    Time for Transformers to take on TSC
---

# Taking on Time-series Classification with Transformers

__Time for Transformers to take on TSC__

<aside class="mdx-author" markdown>
![@tallamjr][@tallamjr avatar]

<span>__Tarek Allam Jr.__· @tallamjr</span>
<span>
:octicons-calendar-24: December 10, 2021 ·
:octicons-clock-24: 15 min read ·
</span>
</aside>

  [@tallamjr avatar]: https://avatars.githubusercontent.com/tallamjr

---

## Introduction

Transformers have come to dominate nearly all areas of deep learning. The work by Vaswani et al.[-@vaswani2017attention],
[@vaswani2017attention],paved the way for things and things

Something [@shannon:1949;@rumelhart1986learning]

Something else [@rumelhart1986learning]

Another thing [@riess1998observational]

### Testing another font
$$
\vec{\nabla} \times \vec{F} =
            \left( \frac{\partial F_z}{\partial y} - \frac{\partial F_y}{\partial z} \right) \mathbf{i}
          + \left( \frac{\partial F_x}{\partial z} - \frac{\partial F_z}{\partial x} \right) \mathbf{j}
          + \left( \frac{\partial F_y}{\partial x} - \frac{\partial F_x}{\partial y} \right) \mathbf{k}
$$

## Paying Attention to Astronomical Transients: Photometric Classification with the Time-Series Transformer

Hi everyone, for those who I have not met yet, my name is Tarek Allam, and I am a final year PhD
student at UCL, working with Jason McEwen and others on time series classification methods.
Specifically on applying deep learning methods to classification of astronomical transients.

Before I start, I just want to saying you to the FINK team for having today to talk about my
"recent" paper: Paying Attention to Astronomical Transients: Photometric Classification with the
Time-Series Transformer.

<!-- ## Outline -->

<!-- Before I dive right in, I thought it would be useful to give a bit of an outline on what I will talk -->
<!-- about, and perhaps, highlight aspects that I would not talk too much about, mainly due to -->
<!-- time-constraints. -->

<!-- So, to start I want to give a brief overview of the motivations for doing Photometric classification -->
<!-- of astronomical transients, since I'm sat in the FINK general meeting, I know this is probably not -->
<!-- needed, but I feel there are some aspects that help motivate some of the choices we made in our work -->
<!-- and would guide future work as well. -->

<!-- I'll then touch on some of the previous methods, again, should be fairly familiar to those on the -->
<!-- call, but hopefully it will give some insight into why we chose the architecture we ended up using, -->
<!-- i.e. a transformer. -->

<!-- I'll then talk about what are transformers, and the building blocks that make up these -->
<!-- architectures, which should then lead me on nicely to our transformer architecture, and how we -->
<!-- adapted things for photometric classification of transients. -->

<!-- Finally I showcase some results, and hopefully spark some discussion about how we may extend our -->
<!-- work and ultimately combining efforts to allow for this work to be a part of FINK, one day. -->


## Motivation: A Deluge of Data

So, without further a-do, what is driving this surge in photometric classification research.

As I sure all of you on the call are aware, the upcoming surveys such as Vera Rubin observatory and
the like, will observe an order of magnitude more alerts that previous surveys. We will be expecting
terabytes of data each night, and so it is obvious that machine learning methods are essential in
this day and age.

Not only does classification methods need to be accurate, of course, but there is an increasing
desire for fast classification that could allow for followup resources to be allocated, should we
want to do say a spectroscopic followup for confirmation etc.

Having said that, spectroscopic followup of all events of interest is not going to feasible so we
would like to prioritise which ones we decide to followup, for this a level of uncertainty
quantification and interpretability of the model is critical to justify instances where we do
followup.

But as I said, there shear volume of events can not all be followed up, so we need methods that we
trust and are robust enough to make accurate classifications on just the photometric data alone.


## Deep Learning to the Rescue!?

Perhaps Deep learning is the answer?

Over the years there has been an explosion of efforts in utilising deep learning methods that would
allow us to create pipelines that should provide fast and accurate followup, as well as allowing us
to be able to scale to the number of alerts we are expecting to see.

Here are just a handful of deep learning methods that have been proposed for photometric
classification.

The key benefit from all of these methods is the exploitation of the time-series information itself.
Traditionally, machine leaning methods would hand craft features and run though classical machine
learning algorithms. Don't get me wrong, these methods worked fantastically, but often then could
not scale and since many of the features are hand-crafted, we potentially were missing out on the
useful information inherent in the time-series itself, but using deep learning would easily allow us
to incorporate this.

Of the deep learning examples on the right, they can be broadly grouped into RNNs, so recurrent
neural networks and CNNs, convolutional neural networks. I won't go into the details of how each of
these family of algorithms work, but suffice to say both of these algorithms are absolute work
horses in the deep learning world and as those papers prove, can provide great success when applied
to photometric classification.

However there are often several frustrations that arise when working with RNNs and CNNs, I'm sure
some of you have even felt this pain first.

A common woe of RNNs is that they are tricky to train, they often suffer from the vanishing
gradients problem, which is essential when gradients are set to zero when backpropagating and
updating the weights in the network, and the issue of maintaining memory for long sequences. If you
want to remember a large sequence, you essentially have to store this entire sequence along with the
weights it's learnt along the way, in memory. A direct consequence of this is parallelising
operations becomes very difficult since we need to maintain context for any future operations to
follow on.

CNNs were thought to alleviate much of these problems, since we can trivially parallelisable
operations, but a major draw back is the number of parameters and the computational cost of running
these networks.  Furthermore, you are limited by the kernel width, or window size, when it comes to
finding relationships between items in the input sequence.

So, is there an alternative deep learning method, that works well for time-series, and easy to
train, and ideally efficient.


## Attention Is All You Need?

Well, perhaps attention is all you need!

Way back in 2017, so a lifetime ago in deep leaning terms, a seminal piece of work was proposed by
Vaswani et al. and this is the architecture on the right which proposes to ditch RNN and CNN
components in favour of attention mechanisms.

It has since become to dominate nearly all areas of deep learning, and is still, in essence, the
state of the art for sequence modelling.

<!-- I say in essence, because the underlying concept of transformers which is the architecture that is -->
<!-- shown here on the right is largely state-of-the art, but over time people have made modifications to -->
<!-- the internals for better efficiently and custom operations depending on the task at hand etc. -->

<!-- Nonetheless, transformers have certainly taken over. -->

Much of there success was because of the issues it seemed to improve following from RNNs and CNNs.
When it comes to the input, with Transformers, we have order-1 reach of input. This links back to
the big problem of RNNs needed to maintain context up to desired sequence length.

The knock-on effect is operations are easily parallelisable and this makes models like this easier
to train.

Now, shown in the diagram is the original architecture by Vaswani et al in 2017. But what is
relevant for the rest of this talk is actually shown here, on the left-hand side. This is called the
encoder section of the transformer, whereas the greyed out section I have covered is called the
decoder. When used in the context of machine translation, the decoder is used for translation of the
sentence, i.e it would take the representations built in the encoder, and use a casual mask to make
translations up to a certain point.

For our task of classification, we only need to consider the encoder section, as this contains all
the elements we will use for classification.

Having said that, if someone wants to do say early classification by only considering parts of the
input, a casual mask could be applied, and this is where the decoder would come in handy.

But anyway.

What the next couple of slides will do is give an overview of the elements that make up the encoder
we see here on the left, since this is the basis of our architecture that I will talk about later.

So, first of all, we need to talk about what kind of inputs the encoder actually expects to take in.

<img src="./assets/vaswani-transformer.png" width=300px >


## Input Embedding and Positional Encoding

So this is focused on the section highlighted in red.

Now the original transformer was designed for the tasks in natural language processing. So we are
dealing with a sequence of words that make up a sentence. But the encoder does not actually take in
the words or the sentence, it takes in a vector representation of this sentence.

So say we have a sentence here: supernovae are awesome, typically what is done is the sentence is
passed through a simple algorithm that takes each word in the sentence and projects it into a vector
space.

So here you see words come in, the word2vec algorithm is often used to then create a vector
representation for each input in the sentence.

But, there is a problem, but doing this transformation, we actually lose the sequential information
of the sentence, everything is just numbers now with no notion of ordering attached to any of the
vectors.

So to bring temporal structure back into the mix, a positional encoding is applied after the
word2vec algorithm.

I won't go into too many details here how this is done, since there are many options now a days for
how one might apply a positional encoding, but suffice to say that after the word2vec algorithm is
applied, we add extra bits to the vector that allows each vector to have some notion of where it
originally appeared in the sequence.


## Multi-headed Self Attention

So following on from this, the sentence is now in a form that can be passed into the encoder block.
The main reason to transform the input in this way, is such that the fundamental component of the
transformer can operate on it, and this is the multi-head self-attention blocks.

This shows a zoomed in picture of the multi-head attention block, which itself has several
components

What is multi head self-attention I hear you cry!? Well sticking with the examples from the original
transformer, using sentence that has been transformed into some vector representation as our input,
the attention mechanism essentially is able to find maximal relations between sets of these vectors.

We see it takes some kind of input X, which is our full sequence input as a d-dimensional matrix
with length L of the sequence length and it is combined with learnable weights to form things called
query, key and values, so that's our Q, K, and V here.

Essentially what we want to know is which information we want to pass where. So we want every
sequence element to know about every other relevant sequence element. So what is done is each
element in the sequence will have a set of keys, as well as a set of queries. We compute a dot
product between them to create an attention matrix, of size L by L, and normalised across the rows
using a softmax. We then combine this with the values, to get our self attention matrix of size L by
dv.

In other words, a self-attention mechanism calculates the alignment weights representing the
relative importance of the inputs in the sequence (the keys) for that particular output (the query).
Multiplying the alignment scores with the input sequence again, which is the values will then weight
the sequence accordingly.

So I hope I didn't throw you off too much, that might have been a bit confusing, but perhaps the
digram on the right should give some intuition, in that we see there are certain words that have a
strong connection to others. And to put it another way, certain points in our sequence are more
influential to other points in the sequence.

Now I've mentioned, multi-head attention, and this is because if we use multiple heads, in others
words, if we break down Q, K and V by a factor of h, we can learn different subspaces or
interpretations of the relations as follows, shown here in red is another head's learned
relationships.

So the idea is that multi-head attention allows the model to jointly attend to information from
different representation subspaces at different positions.

The breakdown of operations is shown in this diagram here where we walk through the computations
that take place. Where we just concatenate the self-attention matrices from the different heads
together to form a final self-attention matrix. Perhaps an important thing to note is the output
shape, which is L by d again, so we can repeat this operation recursively.

<!-- A key thing to take away is the that the final attention matrix when we do --> <!-- things in
this way is of size L by d again, which means we could stack these operations upon one --> <!--
another for several layers of learning. -->

## A Transformer Block [Encoder]

So, now we have seen the process of getting our sequence into a certain form for the multi head
attention components, what about the other pieces inside the encoder. Well, this is simply updating
the input with these operations, and using a LayerNormalisation layer and adding the output to the
original input. Then we pass this through a feed-forward neural network and repeat. And that's it
for the encoder.


## The Time-Series Transformer (`t2`)

So, now I have finally stepped through the operations of the transformer, in particular the encoder
block, I get to tell you about how we adapted this architecture to be suited for photometric
classification.

I'll step through the architecture now much like I did for the original transformer, but this time
going through the additional components we added and adapted.

But the main analogy, and connection I want to highlight before I go on which should hopefully give
some insight as to why we pursued this work is to notice the link with transformer input and our
input, is that for the transformer/encoder, we have a sequence of words that make up a sentence as
input and with ours it is essentially the same thing, but with a set of data points across passbands
observed each day to form a light curve.

<!-- We develop a new transformer architecture for the classification of general multi-variate -->
<!-- time-series data, which uses a variant of the self-attention mechanism, and that we apply to
the --> <!-- photometric classification of astronomical transients. -->


## Dealing with Irregularly Sampled Multivariate Time-Series Data

The trouble comes though with how to we deal with the missing data since photometric data is often
irregularly sampled, since the analogy only works if we have a "full" sequence.

Well, for this we simply use techniques shown to be quite effective for this kind of data, namely
Gaussian preprocess.

In particular, we use the same kernel defined in Boone 2019, which was a 2D Matern kernel which
takes into account the passband information, i.e. wavelength of each filter used and the temporal
information. Following on from fitting the GP, we then evaluate it at a fix number of points, 100
chosen in our case.

From there, we go from irregular sampling to a well sampled light curve, which can then be used to
create our vector representation, which I will come on to now.


## Convolutional Embedding

I've jumped a step, but I'll come onto that later, but now that we have uniform set of points to
work with, we apply a similar transformation as the word2vec algorithm mentioned earlier, where we
transform each input, in this case a set of 6 numbers relating to the photometry at each point, into
a d-dimensional vector space.

Recall that for the multi-head attention mechanism to work it needs input in a vector space
representation.

For this we use 1-dimensional convolutional to project from M to d dimensions at each input in the
sequence. Recall that when we do this, we are taking away the temporal informations and so to retain
this we use a positional encoding as mentioned previously.


## Global Average Pooling

As you can see we've jumped further along again, and this is because the encoder block remains
unchanged from the original Vaswani set up which I described earlier.

The new addition is the inclusion of global average pooling, a technique brought in several years
ago to improve vision classifiers and help with overfitting compared to using a fully connected
networks. Another useful advantage over the fully connected layer is the averaging in a GAP layer
averages out the spatial information leaving it more robust to translations of the inputs

In addition to these reasons, the inclusion of this layer was really prompted by the possibility of
being able to use this for interpretability of the outputs from our encoder and attention
mechanisms. Using a GAP layer, combined with the softmax weights, we are able to inspect which
inputs in the sequence have significant weights when classifying a particular class.

This was adapted to work in the time-series setting, but it is perhaps easier to understand in the
2D version shown here. So we take the weights of the final linear layer in relation to a particular
class, in this case an Australian terrier, and do an element wise product to give a class activation
map for that class.


## Inputting Additional Information

And finally, the other additional component we added was the ability to add any number of additional
features. Whilst I went on earlier about how we would like to perhaps move away from only
hand-crafted features and utilise more temporal information, domain knowledge and additional
features are certainly still useful!

Its been shown on numerous occasions, that redshift and the associated error are some of the most
important features when using traditional machine learning methods, so we add a component here to
allow for inclusion of these features, and we train a model with and with out redshift.

Note, we include this component here to preserve our ability to compute CAMs, since we require the
output of the GAP to go directly into the softmax as mentioned on the previous slide. The benefit of
doing it in this way is we can directly observe the influence of any additional features with the
CAMs too by adding here.


## Performance and Results

So, before I showcase actual results, I want to highlight a few things about training and inference
of this architecture.

The dataset that was used for this investigation was the PLASTICC data. We used the compliment to
what was given to contestants for the original competition. This consisted of around 3 million light
curves, and ensured that while we still were dealing with very imbalanced data, with some 1million
light curves of the 3 million being type Ia supernova, we were at least dealing with representative
data to begin with.

Since we knew that the architecture can be decoupled from the techniques out there that help deal
with non-representativity such as work by Kyle Boone etc with augmentation, we wanted to try our
algorithm in a representative setting first, to see if it would work and then we could incorporate
techniques to deal with non-representativity in future work.

We trained on a single NVIDIA GPU but baked in the functionality for multi-GPU and multi-TPU
training.

And I want to mention that inference is very fast, since we have very few parameters, but it should
be noted, this is not including time to process the light curve with the Gaussian process
interpolation.

So, here we show the Precision-Recall curve.

Where precision gives the fraction of samples predicted as a particular class that indeed belong to
the particular class. While recall, also known as the true positive rate, indicates how well a
particular class was predicted.

And we get a good AUC of 0.87.

Some aspects are worth noting however, we see Kilonova really struggles to the extremely low number
of samples in the training set.

Performance on SNIax is also relatively low; this may be due to miss-classification with Supernova
Type Ia, which are known to be very similar near maximum light.

Here we are showing the confusion matrix for our classifier. What is perhaps most striking is we are
able to handle the extreme class imbalance very well.

We obtain a log-loss of 0.507 when we use additional features of redshift and redshift error, and
when we only input time-series and nothing else, we still get fairly good performance.

Here I've admittedly cherry-picked some examples of the CAMs that we can observe, by way of using
the GAP layer. Notice that we are able to inspect the relative weights as a function of sequence
length for a test light curve. The other thing to note is that we are able to investigate the
strength of the weights associated for any additional features we've added here on the right.

## Extensions and Future Work

So where do we go from here. There are certainly several areas we could extend t2 and there is
plenty of scope for improvements and modifications to our architecture.

I will just mention a couple I reckon could have a great impact...

One of the perhaps most fruitful would be to include a decoder-block such that t2 is more akin to
the original Transformer architecture. As mentioned previously transformers have changed the game
with sequence modelling and nlp, in particular, with regards to real-time speech modelling and
classification. Extending t2 to also have a decoder, and hence a casual masking element as well,
would allow for early light curve classification to be within its remit.

Perhaps you know of Daniel Murthakrisha work for RAPIDS which showed by way of special
pre-processing of the data, such that we have labels at each time step, this allows for you to
essentially build a classifier that can predict more fine grain aspects of the light curve, instead
of having to input an entire light curve, which is what we do. So perhaps this could be used here
also to preprocess the data such that it can then be fed into our network and thus work in real time
or even just have better resolution with regards to classification as a function of time.

Another straight forward extension could be to use distributions for weights as opposed to the point
estimates we are currently using. This would in theory allow for better uncertainty quantification
of our model, and hopefully more interpretability in addition to what we have now. The drawback
foreseen with this is apparently it is very computationally expensive to train probabilistic models
in this way, so the trade-offs would need to be examined more.

So, that was simple extensions to the architecture, what concrete work do I have planned, or would
like to have lined up as followup work. Well, the real test would be to see how t2 fairs up against
real data. Like I said our analysis was done using the PLASTICC dataset from the Kaggle 2018
competition.  It is my understanding that the simulations used for the competition are now outdated
in terms of cadence and other things, and so it would be really interesting to see how we do on say
ZTF data.

Depending how we go, or perhaps could be tried out in parallel would be to put t2 into production.
What I mean by this is I would be really keen to try out t2 as a science module in FINK to see how
the architecture handles a real-time, real-life setting, as I see this as the true test of any
photometric classification architecture, i.e. does it work in the real-world under the stress of
real-data coming at high volume.

For this I would love to explore collaborations with yourselves, or perhaps hear your thoughts on
how I could take this further.

With that, I think it's time for me to close, thanks for your time again, and I hope this was
useful.

I am open to any questions you might have. I will try to answer the best I can, but I may default to
an offline answer later since I am actually quite rusty on some details as I was away from this work
for some time.

But yes, thanks.
