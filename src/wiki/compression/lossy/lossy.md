# Lossy Compression

Lossy compression aims to reduce file sizes by removing some information that is less perceptible to the human eye (or ear), trading off perfect reconstruction for higher compression ratios. In image and video media, various techniques are used that typically follow a common pipeline:

1. **Transform Coding:** Convert spatial (or temporal) data into a domain where energy is compacted into a few coefficients.
2. **Quantization:** Reduce precision of transformed coefficients, discarding less important information.
3. **Entropy Coding:** Apply lossless coding (e.g., Huffman or arithmetic coding) to the quantized coefficients.

## 1. Historical Background

- **Early Developments:**
  The concept of lossy compression has its roots in information theory. Claude Shannon’s work in the 1940s laid the theoretical groundwork by describing the limits of data compression. In the 1970s, researchers began exploring practical transforms, with the **Discrete Cosine Transform (DCT)** emerging as a powerful tool.

  - **Nasir Ahmed et al. (1974):** Pioneered the DCT, which quickly became the foundation for many image compression schemes.

- **JPEG Standard:**

  - **Late 1980s–Early 1990s:** The Joint Photographic Experts Group (JPEG) standardized a compression method based on block-based DCT. The first JPEG standard (ISO/IEC 10918-1) was published in 1992.
  - The JPEG standard was widely adopted for digital photography and web images, thanks to its effective balance between image quality and file size.

- **Wavelet Compression:**

  - **JPEG2000 (2000):** Introduced wavelet transforms to image compression, offering features such as lossless and lossy compression, scalability, and region-of-interest (ROI) coding. The Discrete Wavelet Transform (DWT) replaced the block-based DCT in many aspects, addressing issues like block artifacts common in JPEG.

- **Video Compression Evolution:**
  - **MPEG Standards:**
    - **MPEG-1 (1993):** Primarily targeted at VHS-quality video, it extended image compression techniques (like the DCT) to handle temporal redundancy by using inter-frame prediction.
    - **MPEG-2 (mid-1990s):** Became the basis for digital television and DVD video, improving on motion compensation and coding efficiency.
  - **Modern Codecs:**
    - **H.264/AVC (2003):** Introduced advanced techniques such as variable block-size motion compensation and more efficient entropy coding (e.g., CABAC, CAVLC).
    - **HEVC (H.265, 2013):** Further refined coding efficiency with larger and more flexible block structures (quad-tree partitions) and enhanced motion compensation, enabling high-resolution video compression.

## 2. Detailed Technical Components

### A. Transform Coding

**Discrete Cosine Transform (DCT):**
The DCT concentrates signal energy into a few coefficients, making it easier to discard less important information. For an 8×8 block, the forward DCT is:

\[
F(u,v) = \frac{1}{4} C(u) C(v) \sum*{x=0}^{7}\sum*{y=0}^{7} f(x,y) \cos\!\left[\frac{(2x+1)u\pi}{16}\right] \cos\!\left[\frac{(2y+1)v\pi}{16}\right],
\]

with scaling factors:

\[
C(u) = \begin{cases}
\frac{1}{\sqrt{2}} & \text{if } u=0, \\
1 & \text{if } u>0,
\end{cases} \quad
C(v) = \begin{cases}
\frac{1}{\sqrt{2}} & \text{if } v=0, \\
1 & \text{if } v>0.
\end{cases}
\]

The inverse DCT (IDCT) reconstructs the image block:

\[
f(x,y) = \frac{1}{4} \sum*{u=0}^{7}\sum*{v=0}^{7} C(u) C(v) F(u,v) \cos\!\left[\frac{(2x+1)u\pi}{16}\right] \cos\!\left[\frac{(2y+1)v\pi}{16}\right].
\]

**Wavelet Transform (DWT):**
Wavelets offer multi-resolution analysis. In a one-dimensional setting:

\[
W(j, k) = \sum*{n} f(n) \, \psi*{j,k}(n),
\]

where \( \psi\_{j,k}(n) \) is a wavelet function at scale \( j \) and translation \( k \). In two dimensions, separable filters are applied along both dimensions. Wavelet-based methods allow progressive transmission and ROI coding, which were key advantages in JPEG2000.

### B. Quantization

Quantization reduces the precision of transform coefficients. For the DCT, this is commonly performed as:

\[
F_q(u,v) = \operatorname{round}\!\left(\frac{F(u,v)}{Q(u,v)}\right),
\]

where \( Q(u,v) \) is a quantization step size for each frequency component. Larger \( Q(u,v) \) values yield greater compression (and more loss).

- **Historical Note:** Early implementations of JPEG used fixed quantization matrices designed through psychovisual experiments to determine which frequencies the human eye is less sensitive to.

For wavelet coefficients, quantization can be scalar (treating each coefficient independently) or vector-based, and often involves more sophisticated strategies to control artifacts across scales.

### C. Entropy Coding

After quantization, entropy coding removes statistical redundancy. Common methods include:

- **Huffman Coding:** Constructs a binary tree based on the probability of occurrence of quantized symbols.
- **Arithmetic Coding:** Represents sequences of symbols as intervals on the number line.
- **Context-Adaptive Binary Arithmetic Coding (CABAC):** Used in H.264/AVC and HEVC for improved efficiency by adapting probabilities based on context.

These techniques were refined over decades, with significant contributions from research in the 1970s and 1980s.

### D. Motion Estimation and Compensation in Video

To exploit temporal redundancy, video codecs use motion estimation (finding similar blocks in consecutive frames) and motion compensation (predicting the current frame from previous frames). For a block in frame \( t \):

1. **Prediction:**

   \[
   \hat{f}_t(x,y) = f_{t-1}(x + \Delta x, y + \Delta y),
   \]

   where \( \Delta x \) and \( \Delta y \) are motion vector components.

2. **Residual Calculation:**

   \[
   r(x,y) = f_t(x,y) - \hat{f}\_t(x,y).
   \]

The residual is then processed using transform coding (typically DCT) and quantization. This approach was a cornerstone of MPEG-1/2 and later advanced in H.264 and HEVC.

### E. Rate-Distortion Optimization (RDO)

Balancing compression rate and quality is formalized via rate-distortion optimization. The cost function is often expressed as:

\[
J = D + \lambda R,
\]

where:

- \( D \) is the distortion (e.g., Mean Squared Error between the original and reconstructed signal),
- \( R \) is the rate (number of bits),
- \( \lambda \) is a Lagrange multiplier balancing the trade-off.

RDO has been a central concept since the late 1980s and early 1990s in codec design, allowing algorithms to dynamically select coding parameters (like quantization step sizes or block partitions) to achieve the best quality for a given bit rate.

## 3. Comparison of Techniques with Historical Insights

| **Technique**    | **Domain** | **Main Transform**                     | **Quantization Strategy**                       | **Key Additional Features**                                                                                                          | **Historical Context & References**                                                                                                                                                                      |
| ---------------- | ---------- | -------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **JPEG**         | Image      | Block-based 2D DCT                     | Fixed/adaptive quantization matrix              | Chroma subsampling, zigzag scan, run-length and Huffman coding                                                                       | Standardized in 1992; based on research from the 1970s (Nasir Ahmed et al.). Widely adopted for web and digital photography. [Wallace, G. K., 1991]                                                      |
| **JPEG2000**     | Image      | Discrete Wavelet Transform (DWT)       | Scalar or embedded quantization                 | Scalability, ROI coding, error resilience (EBCOT entropy coding)                                                                     | Published in 2000; developed to overcome JPEG’s limitations (e.g., block artifacts). Based on wavelet research from the 1980s–1990s. [Taubman & Marcellin, 2002]                                         |
| **MPEG-1/2**     | Video      | Block-based 2D DCT (per frame)         | Adaptive quantization with variable block sizes | Motion estimation and compensation; Group-of-Pictures (GOP) structure; simple motion vectors                                         | MPEG-1 (1993) and MPEG-2 (mid-1990s) built on image compression (like JPEG) and extended them for video, integrating temporal redundancy. [ISO/IEC standards for MPEG-1 and MPEG-2]                      |
| **H.264/AVC**    | Video      | Block-based DCT/Integer transforms     | Rate-distortion optimized quantization          | Intra-/inter-frame prediction, variable block sizes (macroblocks, partitions), advanced entropy coding (CABAC, CAVLC)                | Standardized in 2003; marked a major leap in efficiency and flexibility. Introduced sophisticated RDO and improved motion compensation, influenced by earlier MPEG designs. [ITU-T Recommendation H.264] |
| **HEVC (H.265)** | Video      | Variable block-size integer transforms | Advanced rate-distortion quantization           | Quad-tree coding units, improved motion compensation, better performance at high resolutions, and more efficient parallel processing | Standardized in 2013; developed to address the increasing demand for high-resolution video (e.g., 4K, 8K). Built on lessons from H.264 with new partitioning schemes and prediction modes.               |

## 4. Further Developments and Research Directions

- **Perceptual Models:**
  Modern codecs increasingly integrate models of human perception (both visual and auditory) to further optimize which information can be discarded. This includes research into just-noticeable differences (JND) and masking effects.

- **Machine Learning Approaches:**
  Recently, deep learning techniques have been applied to both transform coding (learning optimal transforms) and end-to-end compression systems. These methods may soon influence standards as they show promise in adapting to content dynamically.

- **Error Resilience:**
  As streaming and wireless communications became prevalent, robustness against transmission errors has become more important. Techniques such as unequal error protection and adaptive streaming have been incorporated into newer codec designs.

- **Standards Evolution:**
  The continuous push for higher compression efficiency without sacrificing quality drives research. Beyond HEVC, standards like Versatile Video Coding (VVC) and AV1 are being developed, incorporating many of the traditional techniques but also exploring new paradigms.

## 5. Summary

Lossy compression for images and videos has evolved through decades of research, starting from theoretical foundations in information theory to practical systems like JPEG and MPEG. Key techniques such as transform coding (DCT and DWT), quantization, entropy coding, and motion compensation have been refined over time. Historical milestones—such as the standardization of JPEG in 1992, MPEG-1/2 in the 1990s, H.264 in 2003, and HEVC in 2013—reflect the growing demands for efficient multimedia storage and transmission. Modern research continues to push the boundaries by integrating perceptual models and machine learning approaches.

This expanded overview should give you a deeper understanding of both the technical underpinnings and the historical evolution of lossy compression for image and video media.
