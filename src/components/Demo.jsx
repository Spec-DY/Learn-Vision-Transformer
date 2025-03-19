import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Eye } from "lucide-react";

const VisionTransformerDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  // 添加一个ref来处理图像加载
  const imageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Sample image path
  const imagePath = "/cat.jpg";

  // Steps in the ViT process
  const steps = [
    {
      title: "Original Image",
      description:
        "This is our input image that the Vision Transformer will analyze.",
    },
    {
      title: "Patch Extraction",
      description:
        "The image is divided into 16 equal patches, each processed independently.",
    },
    {
      title: "Embedding Generation",
      description:
        "Each patch is converted to a numerical representation (embedding) using a linear projection.",
    },
    {
      title: "Position Encoding",
      description:
        "Position information is added to each patch embedding so the model knows the spatial arrangement.",
    },
    {
      title: "Self-Attention Mechanism",
      description:
        "Each patch 'attends' to all other patches, measuring their relationships and importance.",
    },
    {
      title: "Multi-Head Attention",
      description:
        "Multiple attention mechanisms work in parallel to capture different types of relationships.",
    },
    {
      title: "Transformer Blocks",
      description:
        "The attention outputs go through several processing layers to extract higher-level features.",
    },
    {
      title: "Classification",
      description:
        "The final layer makes a prediction about what's in the image.",
    },
  ];

  // 处理图像加载
  useEffect(() => {
    // 如果我们已经有一个图像引用，请预加载它
    if (imageRef.current) {
      const img = imageRef.current;
      if (img.complete) {
        setImageLoaded(true);
      } else {
        img.onload = () => {
          setImageLoaded(true);
        };
      }
    }
  }, []);

  // Next step handler
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0); // Loop back to beginning
    }
  };

  // Previous step handler
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentStep(steps.length - 1); // Loop to end
    }
  };

  // Auto-play handler
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  // Render step visualization based on current step
  const renderVisualization = () => {
    switch (currentStep) {
      case 0: // Original image
        return (
          <div className="relative">
            <img
              ref={imageRef}
              src={imagePath}
              alt="Sample"
              className="rounded-lg shadow-md"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        );
      case 1: // Patch extraction - IMPROVED VERSION
        return (
          <div className="grid grid-cols-4 gap-1">
            {Array(16)
              .fill()
              .map((_, i) => {
                // Calculate row and column for this patch
                const col = i % 4;
                const row = Math.floor(i / 4);

                return (
                  <div
                    key={i}
                    className="border-2 border-blue-400 relative overflow-hidden h-24 w-24"
                  >
                    {/* 使用背景图像方法而不是img标签 */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url(${imagePath})`,
                        backgroundSize: "400% 400%",
                        backgroundPosition: `${col * 33.33}% ${row * 33.33}%`,
                      }}
                    />
                  </div>
                );
              })}
          </div>
        );
      case 2: // Embedding generation
        return (
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-4 gap-1">
              {Array(16)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className="border-2 border-blue-400 relative h-14 bg-gray-100 rounded-md flex items-center justify-center text-xs font-mono"
                  >
                    [E<sub>{i}</sub>]
                  </div>
                ))}
            </div>
            <div className="w-full flex justify-center">
              <div className="w-3/4 bg-blue-100 p-2 rounded-lg text-center text-sm">
                Each patch is converted to a vector of 768 dimensions
              </div>
            </div>
          </div>
        );
      case 3: // Position encoding
        return (
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-4 gap-1">
              {Array(16)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className="border-2 border-blue-400 relative h-16 bg-gray-100 rounded-md flex flex-col items-center justify-center p-1"
                  >
                    <div className="text-xs font-mono">
                      [E<sub>{i}</sub>]
                    </div>
                    <div className="text-xs font-mono text-green-600">
                      +[P<sub>{i}</sub>]
                    </div>
                  </div>
                ))}
            </div>
            <div className="w-full flex justify-center">
              <div className="w-3/4 bg-green-100 p-2 rounded-lg text-center text-sm">
                Position encodings are added to maintain spatial information
              </div>
            </div>
          </div>
        );
      case 4: // Self-attention mechanism
        return (
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <div className="grid grid-cols-4 gap-1">
                {Array(16)
                  .fill()
                  .map((_, i) => (
                    <div
                      key={i}
                      className="border-2 border-purple-400 relative h-14 bg-purple-50 rounded-md flex items-center justify-center"
                    >
                      <div className="text-xs font-mono">
                        P<sub>{i}</sub>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Visualize some attention connections */}
              <svg
                className="absolute top-0 left-0 w-full h-full"
                style={{ pointerEvents: "none" }}
              >
                <line
                  x1="40"
                  y1="20"
                  x2="160"
                  y2="20"
                  stroke="rgba(139, 92, 246, 0.5)"
                  strokeWidth="2"
                />
                <line
                  x1="40"
                  y1="20"
                  x2="100"
                  y2="60"
                  stroke="rgba(139, 92, 246, 0.3)"
                  strokeWidth="1"
                />
                <line
                  x1="160"
                  y1="20"
                  x2="220"
                  y2="20"
                  stroke="rgba(139, 92, 246, 0.7)"
                  strokeWidth="3"
                />
              </svg>
            </div>
            <div className="w-full flex justify-center">
              <div className="w-3/4 bg-purple-100 p-2 rounded-lg text-center text-sm">
                Attention weights show how each patch relates to all other
                patches
              </div>
            </div>
          </div>
        );
      case 5: // Multi-head attention
        return (
          <div className="flex flex-col space-y-4">
            <div className="flex justify-center">
              <div className="grid grid-rows-3 gap-4">
                <div className="grid grid-cols-4 gap-1">
                  {Array(8)
                    .fill()
                    .map((_, i) => (
                      <div
                        key={i}
                        className="border-2 border-red-400 relative h-12 w-12 bg-red-50 rounded-md flex items-center justify-center"
                      >
                        <div className="text-xs font-mono">
                          H<sub>{i}</sub>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {Array(8)
                    .fill()
                    .map((_, i) => (
                      <div
                        key={i}
                        className="border-2 border-blue-400 relative h-12 w-12 bg-blue-50 rounded-md flex items-center justify-center"
                      >
                        <div className="text-xs font-mono">
                          H<sub>{i + 8}</sub>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <div className="w-3/4 bg-indigo-100 p-2 rounded-lg text-center text-sm">
                Multiple attention heads capture different types of
                relationships
              </div>
            </div>
          </div>
        );
      case 6: // Transformer blocks
        return (
          <div className="flex flex-col space-y-4 items-center">
            <div className="flex flex-col space-y-2">
              <div className="h-16 w-64 bg-indigo-200 rounded-lg flex items-center justify-center">
                <span className="font-semibold">Multi-Head Attention</span>
              </div>
              <div className="h-6 flex justify-center">
                <div className="w-2 bg-gray-400"></div>
              </div>
              <div className="h-16 w-64 bg-green-200 rounded-lg flex items-center justify-center">
                <span className="font-semibold">Layer Normalization</span>
              </div>
              <div className="h-6 flex justify-center">
                <div className="w-2 bg-gray-400"></div>
              </div>
              <div className="h-16 w-64 bg-yellow-200 rounded-lg flex items-center justify-center">
                <span className="font-semibold">Feed Forward Network</span>
              </div>
              <div className="h-6 flex justify-center">
                <div className="w-2 bg-gray-400"></div>
              </div>
              <div className="h-16 w-64 bg-green-200 rounded-lg flex items-center justify-center">
                <span className="font-semibold">Layer Normalization</span>
              </div>
            </div>
          </div>
        );
      case 7: // Classification
        return (
          <div className="flex flex-col space-y-6 items-center">
            <div className="w-64 h-16 bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center">
              <span className="font-semibold">Transformer Encoder Output</span>
            </div>
            <div className="h-6 flex justify-center">
              <div className="w-2 bg-gray-400"></div>
            </div>
            <div className="w-48 p-4 bg-green-100 rounded-lg border-2 border-green-400 flex items-center justify-center shadow-lg">
              <span className="font-bold text-lg">Tabby Cat 🐱 (61.38%)</span>
            </div>
            <div className="w-48 p-4 bg-grey-100 rounded-lg border-2 border-grey-400 flex items-center justify-center shadow-lg">
              <span className="font-bold text-lg">Egyptian Cat (12.61%)</span>
            </div>
            <div className="w-48 p-4 bg-grey-100 rounded-lg border-2 border-grey-400 flex items-center justify-center shadow-lg">
              <span className="font-bold text-lg">Tiger Cat (8.50%)</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          See how a Vision Transformer processes images step by step
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>

      {/* Current step title and description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Step {currentStep + 1}: {steps[currentStep].title}
        </h2>
        <p className="text-gray-600">{steps[currentStep].description}</p>
      </div>

      {/* Visualization area */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6 min-h-64 flex items-center justify-center">
        {renderVisualization()}
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mt-6">
        <div className="space-x-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            <Eye className="w-4 h-4 mr-2" />
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
        </div>

        <div className="space-x-2">
          <button
            onClick={prevStep}
            className="p-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={nextStep}
            className="p-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Additional details panel */}
      {showDetails && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-2">
            Technical Details
          </h3>
          <p className="text-sm text-gray-700 mb-2">
            {currentStep === 0 &&
              `We begin with a simple image of a cat. This is the input for the Vision Transformer—just like images that we humans see with our eyes. 
            Computers don't 'see' a cat directly like humans do. Instead, they see a matrix of numbers, with each number representing the color information of a pixel. 
            The Vision Transformer's job is to understand what these numbers represent.
            Traditional computer vision methods work by looking at local features (like first examining the eyes, then the ears, then the whiskers), 
            but Vision Transformers are more like humans—they can pay attention to multiple parts of an image simultaneously and understand the relationships between them.`}
            {currentStep === 1 &&
              `In this second step, the Vision Transformer divides the image into multiple small pieces, like cutting a puzzle into small squares. In our demonstration, we've divided the image into a 4×4 grid, giving us 16 patches in total.
            In a real Vision Transformer, a more detailed division is typically used, such as splitting a 224×224 pixel image into 196 patches of 16×16 pixels each.
            This patch-based approach is one of the key differences between Vision Transformers and traditional Convolutional Neural Networks (CNNs). CNNs use sliding windows to look at local features, while ViTs directly divide the image into non-overlapping patches, allowing them to process information more globally.
            `}
            {currentStep === 2 &&
              `In the third step, the Vision Transformer converts each image patch into a numerical vector (embedding). These vectors are mathematical representations of the patches, containing their feature information.
            Imagine translating each patch into a "language" that computers can understand. In our demonstration, each patch is converted into a 768-dimensional vector. This number may seem large, but it's why AI can capture such rich visual information—it uses a large number of values to describe each image patch.
            This is like converting visual information into a computer's "thinking space," enabling the model to reason about the image.
            `}
            {currentStep === 3 &&
              `The fourth step is crucial! When we divide an image into patches, we lose information about where each patch is located in the original image. Vision Transformers solve this problem by adding "position encodings."
            This is like numbering each piece of a puzzle, telling the computer "this piece is in the top left," "this piece is in the bottom right," and so on. This allows the model to know the spatial position of each patch, helping it understand the spatial structure of the image.
            Without position encoding, the model might confuse an ear in the top left with a paw in the bottom right because it wouldn't know which is where. Position encoding ensures that the model understands the positional relationship of each part within the overall image.
            `}
            {currentStep === 4 &&
              `The fifth step is the core magic of Vision Transformers—the self-attention mechanism. This mechanism allows each image patch to "attend to" or "look at" all other patches, evaluating the relationships and importance between them.
            Imagine that as the model processes the patch containing one of the cat's eyes, it asks: "Which other patches are related to me?" It might find that patches containing the other eye, the ears, and the nose are all important, while background patches are less relevant.

            In this interface, we see 16 image patches (P0 to P15). inside the model, each patch is calculating its relationship strength with all other patches. This self-attention mechanism enables the model to understand relationships between different parts of the image, which is key to recognizing complex patterns.
            `}
            {currentStep === 5 &&
              `In the sixth step, Vision Transformers use "multi-head attention"—essentially multiple self-attention mechanisms working simultaneously, each focusing on different aspects or features of the image.
            This is like having multiple experts analyzing the same image, but each expert focuses on different types of patterns or relationships:
            some heads may focus on color relationships, some may focus on shape relationships, texture relationships or spatial relationships.
            In this demonstration, we show 16 attention heads organized into two groups. In an actual ViT model, there are typically 8 to 16 attention heads, each independently learning different types of visual relationships, and then combining this information.
            `}
            {currentStep === 6 && (
              <>
                <p>
                  The seventh step shows the internal structure of a complete
                  Transformer block. Each Transformer block contains several key
                  components:
                </p>
                <ul className="list-decimal pl-5">
                  <li>
                    <strong>Multi-Head Attention:</strong> The mechanism we just
                    discussed, allowing the model to look at relationships
                    between different parts of the image.
                  </li>
                  <li>
                    <strong>Layer Normalization:</strong> Ensures data
                    stability, preventing numerical issues during training.
                  </li>
                  <li>
                    <strong>Feed-Forward Neural Network:</strong> Further
                    processes the output of the attention mechanism, extracting
                    higher-level features.
                  </li>
                  <li>
                    <strong>Another Layer Normalization:</strong> Again
                    stabilizes the data.
                  </li>
                </ul>
                <p>
                  A typical Vision Transformer includes multiple Transformer
                  blocks, with each block receiving information from the
                  previous one, extracting increasingly higher-level features
                  layer by layer. It's like understanding an image in
                  progressively deeper layers, from simple lines and colors to
                  complex shapes and semantic concepts.
                </p>
              </>
            )}
            {currentStep === 7 &&
              `The final step is the classification process. After processing through all the Transformer blocks, the model generates a final representation of the image and uses it to predict what's in the image.
            In our example, the model identifies with 61.38% confidence that the image contains a Tabby cat. This high confidence indicates the model is very certain of its prediction.
            In reality, Vision Transformers can typically recognize thousands of different objects, animals, scenes, and more, with very high accuracy—sometimes even exceeding human performance.
            `}
          </p>
        </div>
      )}
    </div>
  );
};

export default VisionTransformerDemo;
