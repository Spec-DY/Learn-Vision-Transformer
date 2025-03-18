import React, { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Eye } from "lucide-react";

const VisionTransformerDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Sample image path
  const imagePath = "https://placehold.co/400x300";

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
  React.useEffect(() => {
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
              src={imagePath}
              alt="Sample"
              className="rounded-lg shadow-md"
            />
          </div>
        );
      case 1: // Patch extraction
        return (
          <div className="grid grid-cols-4 gap-1">
            {Array(16)
              .fill()
              .map((_, i) => (
                <div key={i} className="border-2 border-blue-400 relative">
                  <img
                    src={imagePath}
                    alt={`Patch ${i}`}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: `${-100 * (i % 4)}% ${
                        -100 * Math.floor(i / 4)
                      }%`,
                      transform: "scale(4)",
                    }}
                  />
                </div>
              ))}
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
                    className="border-2 border-blue-400 relative h-12 bg-gray-100 rounded-md flex items-center justify-center text-xs font-mono"
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
                      className="border-2 border-purple-400 relative h-10 bg-purple-50 rounded-md flex items-center justify-center"
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
                        className="border-2 border-red-400 relative h-8 w-8 bg-red-50 rounded-md flex items-center justify-center"
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
                        className="border-2 border-blue-400 relative h-8 w-8 bg-blue-50 rounded-md flex items-center justify-center"
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
            <div className="w-48 p-4 bg-green-100 rounded-lg border-2 border-green-400 flex items-center justify-center">
              <span className="font-bold text-lg">CAT 🐱 (98.7%)</span>
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
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Vision Transformer Interactive Demo
        </h1>
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
              "Input images are typically resized to 224×224 pixels and normalized."}
            {currentStep === 1 &&
              "Standard ViT uses 16×16 pixel patches, resulting in 196 patches for a 224×224 image."}
            {currentStep === 2 &&
              "Linear projection maps each patch to an embedding dimension (typically 768 or 1024)."}
            {currentStep === 3 &&
              "Sinusoidal or learned position embeddings maintain spatial information."}
            {currentStep === 4 &&
              "Self-attention computes Query, Key, and Value matrices to determine relationships."}
            {currentStep === 5 &&
              "ViT typically uses 12 attention heads, each focusing on different relationship patterns."}
            {currentStep === 6 &&
              "Standard ViT has 12 transformer blocks with skip connections."}
            {currentStep === 7 &&
              "A special [CLS] token is typically used for final classification."}
          </p>
        </div>
      )}
    </div>
  );
};

export default VisionTransformerDemo;
